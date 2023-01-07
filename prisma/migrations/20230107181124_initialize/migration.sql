/*
  Warnings:

  - Made the column `deleted` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "todo" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "userId" INTEGER,
    "deleted" BOOLEAN NOT NULL,
    "deletedAt" TEXT,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("createdAt", "deleted", "deletedAt", "finished", "id", "todo", "userId") SELECT "createdAt", "deleted", "deletedAt", "finished", "id", "todo", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
