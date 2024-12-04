-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "labels" TEXT NOT NULL,
    "datasetLabel" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "borderColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
