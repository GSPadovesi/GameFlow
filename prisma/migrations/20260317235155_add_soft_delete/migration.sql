-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GameDeveloper" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GameGenre" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GamePlatform" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserAccess" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserGame" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Developer_deletedAt_idx" ON "Developer"("deletedAt");

-- CreateIndex
CREATE INDEX "Game_deletedAt_idx" ON "Game"("deletedAt");

-- CreateIndex
CREATE INDEX "GameDeveloper_deletedAt_idx" ON "GameDeveloper"("deletedAt");

-- CreateIndex
CREATE INDEX "GameGenre_deletedAt_idx" ON "GameGenre"("deletedAt");

-- CreateIndex
CREATE INDEX "GamePlatform_deletedAt_idx" ON "GamePlatform"("deletedAt");

-- CreateIndex
CREATE INDEX "Genre_deletedAt_idx" ON "Genre"("deletedAt");

-- CreateIndex
CREATE INDEX "Platform_deletedAt_idx" ON "Platform"("deletedAt");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "UserAccess_deletedAt_idx" ON "UserAccess"("deletedAt");

-- CreateIndex
CREATE INDEX "UserGame_deletedAt_idx" ON "UserGame"("deletedAt");
