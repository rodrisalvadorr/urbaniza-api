/*
  Warnings:

  - Added the required column `changed_password_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "changed_password_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "changed_profile_picture_at" TIMESTAMP(3),
ADD COLUMN     "email_validated_at" TIMESTAMP(3),
ADD COLUMN     "validation_code" TEXT;
