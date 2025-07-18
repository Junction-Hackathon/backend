/*
  Warnings:

  - The values [sacrifiedc] on the enum `SacrificeStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [DRIVER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SacrificeStatus_new" AS ENUM ('pending', 'onWay', 'delivred', 'sacrificed', 'cancelled');
ALTER TABLE "sacrifice" ALTER COLUMN "status" TYPE "SacrificeStatus_new" USING ("status"::text::"SacrificeStatus_new");
ALTER TYPE "SacrificeStatus" RENAME TO "SacrificeStatus_old";
ALTER TYPE "SacrificeStatus_new" RENAME TO "SacrificeStatus";
DROP TYPE "SacrificeStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ORGANIZER', 'DBA7', 'DONOR');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;
