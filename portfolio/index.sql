--run create tables script, triggers/functions script, load csv script,  calculation script in order

-- 1. Create the `reits` table.
CREATE TABLE tblReits (
  reits_id serial PRIMARY KEY,
  code varchar(100) NOT NULL,
  name varchar(255) NOT NULL
);

-- 2. Create the `activities` table.
CREATE TABLE tblActivities (
  activity_id serial PRIMARY KEY,
  reits_id integer NOT NULL,
  type varchar(255) NOT NULL,
  quantity integer NOT NULL,
  tradePrice double precision NOT NULL,
  tradeDate date NOT NULL,
  cumulativeQty integer,
  avgBuyPrice double precision,
  SellProfit double precision,
  CONSTRAINT tblActivities_reits_id FOREIGN KEY (reits_id)
      REFERENCES tblReits (reits_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- 3. Create the `prices` table.
CREATE TABLE tblPrices (
  reits_id integer NOT NULL,
  price double precision NOT NULL,
  priceDate date NOT NULL,
  CONSTRAINT tblPrices_reits_id FOREIGN KEY (reits_id)
      REFERENCES tblReits (reits_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- 4. Define the `calculateHoldings` procedure.
CREATE OR REPLACE FUNCTION calculateHoldings(indate date) 
	RETURNS TABLE(
	Code VARCHAR,
	Quantity INT,
	"Average Buy Price" DOUBLE PRECISION,
	"Sell Profit" DOUBLE PRECISION,
	Profit DOUBLE PRECISION
	)  
	AS $$            
    BEGIN
		DROP TABLE IF EXISTS temp_maxDates;
		CREATE TEMP TABLE temp_maxDates AS
		SELECT reits_id, MAX(tradedate) as tradeDate from tblactivities
		WHERE tradeDate <= indate
		GROUP BY reits_id;

		DROP TABLE IF EXISTS temp_lastReits;
		CREATE TEMP TABLE temp_lastReits
		AS
		SELECT * FROM tblActivities where tradeDate IN (Select tradeDate from temp_maxDates);
		
		
		RETURN QUERY SELECT tblreits.code as Code, tblactivities.cumulativeqty as Quantity,tblactivities.avgbuyprice as "Average Buy Price",
		doSumSP(tblactivities.reits_id,indate) as "Sell Profit",
		((doSumSP(tblactivities.reits_id,indate)+(getMaxPrice(tblactivities.reits_id,indate)-tblactivities.avgbuyprice)*tblactivities.cumulativeQty)) as Profit
		FROM tblreits LEFT JOIN tblactivities ON tblreits.reits_id = tblactivities.reits_id AND tblactivities.activity_id IN (SELECT activity_id FROM temp_lastReits);                       
END;
$$ LANGUAGE plpgsql;
	
-- 5. Define the `calculateMetrics` procedure.
DROP TABLE IF EXISTS temp_partialMetrics;
CREATE TEMP TABLE temp_partialMetrics AS
SELECT (calculateholdings."quantity" * tblprices.price) as partialvalue, tblprices.reits_id, tblprices.priceDate, tblreits.code as code FROM calculateHoldings(getMaxDate()) 
LEFT JOIN tblreits ON calculateHoldings."code" = tblreits.code
LEFT JOIN tblprices ON tblreits.reits_id = tblprices.reits_id;

CREATE OR REPLACE FUNCTION calculateMetrics(indate date) 
	RETURNS TABLE(
	Value DOUBLE PRECISION,
	Profit DOUBLE PRECISION
	)  
	AS $$            
    BEGIN
		
		DROP TABLE IF EXISTS temp_maxMDates;
		CREATE TEMP TABLE temp_maxMDates AS
		SELECT reits_id, MAX(priceDate) as priceDate from tblprices
		WHERE priceDate <= indate GROUP BY reits_id;
		
		RETURN QUERY SELECT SUM(temp_partialMetrics.partialvalue) as Value, SUM(calculateHoldings."profit") as Profit from calculateHoldings(indate) LEFT JOIN temp_partialMetrics ON calculateHoldings."code" = temp_partialMetrics.code WHERE temp_partialMetrics.priceDate IN (SELECT priceDate from temp_maxMDates);                       
    END;
$$ LANGUAGE plpgsql;

-- 6. Load `reits.csv` into the `reits` table.
COPY tblreits(code,name) 
FROM 'C:\hio\exercises_\exercises-master\portfolio\reits.csv' DELIMITER ',' CSV HEADER;

-- 7. Load `prices.csv` into the `prices` table.
DROP TABLE IF EXISTS temp_price;  
CREATE TEMPORARY TABLE temp_price(
  priceDate date NOT NULL,
  "A17U.SI" double precision NOT NULL,
  "N2IU.SI" double precision NOT NULL,
  "M1GU.SI" double precision NOT NULL
);
---manual & impractical way for temptable
COPY temp_price(priceDate,"A17U.SI","N2IU.SI","M1GU.SI") 
FROM 'C:\hio\exercises_\exercises-master\portfolio\prices.csv' DELIMITER ',' CSV HEADER;

CREATE OR REPLACE FUNCTION unnest(anyarray)
  RETURNS SETOF anyelement AS
$BODY$
SELECT $1[i]
FROM   generate_series(array_lower($1,1), array_upper($1,1)) i
$BODY$
  LANGUAGE SQL IMMUTABLE;
  
DROP TABLE IF EXISTS temp_rawprice;  

CREATE TEMP TABLE temp_rawprice AS
SELECT
	priceDate,
   unnest(array['A17U.SI', 'N2IU.SI', 'M1GU.SI']) AS "reitsCode",
   unnest(array["A17U.SI","N2IU.SI","M1GU.SI"]) AS "price"
FROM temp_price
ORDER BY priceDate ASC;

INSERT INTO tblPrices(reits_id,price,priceDate)
SELECT tblreits.reits_id,temp_rawprice.price,temp_rawprice.priceDate FROM tblreits LEFT JOIN temp_rawprice ON tblreits.code = temp_rawprice."reitsCode";

-- 8. Load `activities.csv` into the `activities` table.
DROP TABLE IF EXISTS temp_activities;  
CREATE TEMPORARY TABLE temp_activities(
  activity_id serial PRIMARY KEY,
  reitsCode varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  quantity integer NOT NULL,
  tradePrice double precision NOT NULL,
  tradeDate date NOT NULL,
  cumulativeQty integer,
  avgBuyPrice double precision,
  SellProfit double precision
);
COPY temp_activities(tradeDate,reitsCode,type,quantity,tradePrice) 
FROM 'C:\hio\exercises_\exercises-master\portfolio\activities.csv' DELIMITER ',' CSV HEADER;	

INSERT INTO tblActivities(reits_id,type,quantity,tradePrice,tradeDate)
SELECT tblreits.reits_id,temp_activities.type,temp_activities.quantity,temp_activities.tradePrice,temp_activities.tradeDate FROM tblreits LEFT JOIN temp_activities ON tblreits.code = temp_activities.reitsCode
ORDER BY temp_activities.tradeDate ASC;

--**triggers and functions
--populating first reits
CREATE OR REPLACE FUNCTION populateFirstReits() 
RETURNS trigger AS $BODY$
BEGIN
	DROP TABLE IF EXISTS temp_minDates;
	CREATE TEMP TABLE temp_minDates AS
	SELECT reits_id, MIN(tradedate) as tradeDate from tblactivities
	WHERE type='BUY'
	GROUP BY reits_id;

	DROP TABLE IF EXISTS temp_firstReits;
	CREATE TEMP TABLE temp_firstReits
	AS
	SELECT * FROM tblActivities where tradeDate IN (Select tradeDate from temp_minDates);

	UPDATE tblactivities SET cumulativeqty = quantity
	WHERE activity_id IN (SELECT activity_id FROM temp_firstReits);

	UPDATE tblactivities SET avgbuyprice = tradeprice
	WHERE activity_id IN (SELECT activity_id FROM temp_firstReits);
    RETURN NEW;
END;
$BODY$ LANGUAGE PLPGSQL;

CREATE TRIGGER popFirstReits
AFTER INSERT
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE populateFirstReits();

  
--- cumulativeQty column
CREATE OR REPLACE FUNCTION doCQty(tdate date,id integer) RETURNS integer AS $$
    SELECT cumulativeQty FROM tblActivities WHERE tradeDate < tdate AND reits_id = id ORDER BY tradeDate DESC LIMIT 1
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION calcCQty() 
RETURNS trigger AS $calcCQty$
BEGIN
	UPDATE tblActivities
	SET cumulativeQty = CASE
		WHEN type='BUY' THEN (doCQty(tradeDate, reits_id) + quantity)
		WHEN type='SELL' THEN (doCQty(tradeDate, reits_id) - quantity)
		END
	WHERE cumulativeQty IS NULL;

    RETURN NEW;
END;
$calcCQty$ LANGUAGE PLPGSQL;

CREATE TRIGGER cumuQtyAdded
AFTER INSERT
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcCQty();

--- avgbuyprice column
CREATE OR REPLACE FUNCTION doBuyAvgBP(tdate date,id integer) RETURNS double precision AS $$
    SELECT (avgBuyPrice*cumulativeQty) as col1 FROM tblActivities WHERE tradeDate < tdate AND reits_id = id ORDER BY tradeDate DESC LIMIT 1
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION doSellAvgBP(tdate date,id integer) RETURNS double precision AS $$
    SELECT avgBuyPrice FROM tblActivities WHERE tradeDate < tdate AND reits_id = id ORDER BY tradeDate DESC LIMIT 1
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION calcAvgBuyPrice() 
RETURNS trigger AS $calcAvgBuyPrice$
BEGIN
    UPDATE tblActivities
	SET avgBuyPrice = CASE
		WHEN type='BUY' THEN ((doBuyAvgBP(tradeDate, reits_id) + (tradeprice*quantity))/cumulativeQty)
		WHEN type='SELL' THEN (doSellAvgBP(tradeDate, reits_id))
		END
	WHERE avgBuyPrice IS NULL;
    RETURN NEW;
END;
$calcAvgBuyPrice$ LANGUAGE PLPGSQL;

CREATE TRIGGER avgBPAdded
AFTER INSERT
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcAvgBuyPrice();
  
--- sellprofit column
CREATE OR REPLACE FUNCTION calcSProfit() 
RETURNS trigger AS $calcSProfit$
BEGIN
    UPDATE tblActivities
	SET sellprofit = CASE
		WHEN type='BUY' THEN 0
		WHEN type='SELL' THEN ((tradePrice-avgBuyPrice)*quantity)
		END
	WHERE sellprofit IS NULL;
    RETURN NEW;
END;
$calcSProfit$ LANGUAGE PLPGSQL;

CREATE TRIGGER sProfitAdded
AFTER INSERT
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcSProfit();


--- calculateHoldings functions
CREATE OR REPLACE FUNCTION doSumSP(id integer,tdate date) RETURNS double precision AS $$
    SELECT SUM(sellProfit) FROM tblActivities WHERE reits_id = id AND tradeDate <= tdate
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getMaxPrice(id integer,tdate date) RETURNS double precision AS $$
    SELECT price FROM tblprices WHERE reits_id = id AND priceDate <= tdate ORDER BY pricedate DESC LIMIT 1
$$ LANGUAGE SQL;

--- calculateMetrics functions
CREATE OR REPLACE FUNCTION getMaxDate() RETURNS date AS $$
    SELECT MAX(priceDate) as pdate FROM tblprices LIMIT 1
$$ LANGUAGE SQL;

--- extra on updates
CREATE TRIGGER popFirstReitsUpdate
AFTER UPDATE
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE populateFirstReits();

CREATE TRIGGER cumuQtyUpdated
AFTER UPDATE
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcCQty();

CREATE TRIGGER avgBPUpdated
AFTER UPDATE
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcAvgBuyPrice();

CREATE TRIGGER sProfitUpdated
AFTER UPDATE
ON tblActivities
FOR EACH ROW
EXECUTE PROCEDURE calcSProfit();