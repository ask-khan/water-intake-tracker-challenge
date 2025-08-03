-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WaterLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "intakeMl" INTEGER NOT NULL
);
INSERT INTO "new_WaterLog" ("date", "id", "intakeMl", "userId") SELECT "date", "id", "intakeMl", "userId" FROM "WaterLog";
DROP TABLE "WaterLog";
ALTER TABLE "new_WaterLog" RENAME TO "WaterLog";
CREATE UNIQUE INDEX "WaterLog_userId_date_key" ON "WaterLog"("userId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
