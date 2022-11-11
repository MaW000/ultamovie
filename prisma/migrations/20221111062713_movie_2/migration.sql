/*
  Warnings:

  - You are about to drop the column `body` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `imdbRating` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rated` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "body",
ADD COLUMN     "imdbRating" TEXT NOT NULL,
ADD COLUMN     "plot" TEXT NOT NULL,
ADD COLUMN     "poster" TEXT NOT NULL,
ADD COLUMN     "rated" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
