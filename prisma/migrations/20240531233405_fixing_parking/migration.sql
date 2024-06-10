/*
  Warnings:

  - You are about to drop the column `lat` on the `Parking` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `Parking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Parking` DROP COLUMN `lat`,
    DROP COLUMN `lon`,
    ADD COLUMN `latitude` DOUBLE NOT NULL DEFAULT 1.0,
    ADD COLUMN `longitude` DOUBLE NOT NULL DEFAULT 1.0;
