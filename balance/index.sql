CREATE TABLE "Account" (
  "id" serial PRIMARY KEY,
  "balance" double precision,
  "availableBalance" double precision
);

CREATE TABLE "ReservedBalance" (
  "id" serial PRIMARY KEY,
  "accountId" integer NOT NULL,
  "context" varchar(255),
  "balance" double precision,
  "isReleased" boolean,
  CONSTRAINT ReservedBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE "VirtualBalance" (
  "id" serial PRIMARY KEY,
  "accountId" integer NOT NULL,
  "context" varchar(255),
  "balance" double precision,
  "isCommit" boolean,
  CONSTRAINT VirtualBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE "Request" (
  "id" serial PRIMARY KEY,
  "uuId"  varchar(255),
  "accountId" integer,
  "reservedBalanceId" integer,
  "virtualBalanceId" integer,
  "amount"  double precision,
  "resultSet"  varchar(255),
  "requestType" varchar(255)
);