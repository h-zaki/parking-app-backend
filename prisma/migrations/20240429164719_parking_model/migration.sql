/*
  Warnings:

  - Added the required column `adress` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emptyBlocks` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Parking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Parking` ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `emptyBlocks` INTEGER NOT NULL,
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
