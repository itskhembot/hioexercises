CREATE TABLE Account (
  Id serial PRIMARY KEY,
  Balance double precision,
  AvailableBalance double precision
);

CREATE TABLE ReservedBalance (
  Id serial PRIMARY KEY,
  AccountId integer NOT NULL,
  Context varchar(255),
  Balance double precision,
  IsReleased boolean,
  CONSTRAINT ReservedBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE VirtualBalance (
  Id serial PRIMARY KEY,
  AccountId integer NOT NULL,
  Context varchar(255),
  Balance double precision,
  IsCommit boolean,
  CONSTRAINT VirtualBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE Request (
  uuId  varchar(255),
  accountId integer,
  reservedbalanceid integer,
  virtualbalanceid integer,
  amount  double precision,
  resultset  varchar(255),
  requesttype varchar(255)
);