/*
  Warnings:

  - You are about to drop the column `reservationTime` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `reservationTime`,
    ADD COLUMN `arrivalTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 1;
