/*
  Warnings:

  - You are about to drop the column `appUrl` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `lastModified` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Photo" DROP COLUMN "appUrl",
DROP COLUMN "lastModified";
