-- AlterTable
CREATE SEQUENCE medalinstance_medal_id_seq;
ALTER TABLE "MedalInstance" ALTER COLUMN "medal_id" SET DEFAULT nextval('medalinstance_medal_id_seq');
ALTER SEQUENCE medalinstance_medal_id_seq OWNED BY "MedalInstance"."medal_id";
