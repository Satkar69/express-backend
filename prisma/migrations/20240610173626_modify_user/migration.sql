/*
  Warnings:

  - You are about to drop the column `user_email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_user_email_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_email`,
    DROP COLUMN `user_name`,
    DROP COLUMN `user_password`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_user_email_key` ON `users`(`email`);
