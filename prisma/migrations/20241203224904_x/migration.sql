-- CreateTable
CREATE TABLE "PlatformSource" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "users" INTEGER NOT NULL,
    "dashboardId" TEXT NOT NULL,

    CONSTRAINT "PlatformSource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatformSource" ADD CONSTRAINT "PlatformSource_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
