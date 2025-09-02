/*
  Warnings:

  - The `lastModified` column on the `Photo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Photo" DROP COLUMN "lastModified",
ADD COLUMN     "lastModified" INTEGER;
