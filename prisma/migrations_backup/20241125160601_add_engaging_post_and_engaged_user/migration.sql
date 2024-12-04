-- CreateTable
CREATE TABLE "EngagingPost" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "EngagingPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngagedUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "engagementCount" INTEGER NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "EngagedUser_pkey" PRIMARY KEY ("id")
);
