-- CreateTable
CREATE TABLE "Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Urls_id_key" ON "Urls"("id");

-- CreateIndex
CREATE INDEX "Urls_short_url_idx" ON "Urls"("short_url");
