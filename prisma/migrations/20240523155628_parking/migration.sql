/*
  Warnings:

  - You are about to drop the column `adress` on the `parking` table. All the data in the column will be lost.
  - Added the required column `address` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Parking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parking` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;
