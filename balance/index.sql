CREATE TABLE "Account" (
  "id" serial PRIMARY KEY,
  "balance" double precision,
  "availableBalance" double precision
);

CREATE TABLE "ReservedBalance" (
  "id" serial PRIMARY KEY,
  "account" integer NOT NULL,
  "context" varchar(255),
  "balance" double precision,
  "isReleased" boolean,
  CONSTRAINT ReservedBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE "VirtualBalance" (
  "id" serial PRIMARY KEY,
  "account" integer NOT NULL,
  "context" varchar(255),
  "balance" double precision,
  "isCommit" boolean,
  CONSTRAINT VirtualBalance_AccountId FOREIGN KEY (AccountId)
      REFERENCES Account (Id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE "Request" (
  "id" varchar(255) PRIMARY KEY,
  "result"  varchar(255),
  "error" varchar(255)
);