/*
  Warnings:

  - You are about to drop the `KPI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "KPI";

-- CreateTable
CREATE TABLE "Kpi" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Kpi_pkey" PRIMARY KEY ("id")
);
