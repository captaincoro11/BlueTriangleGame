/*
  Warnings:

  - Added the required column `blueTriangles` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "blueTriangles" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;
