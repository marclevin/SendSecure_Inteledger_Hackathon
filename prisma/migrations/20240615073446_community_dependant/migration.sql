-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "imageUrl" TEXT,
    "creatorID" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "imageUrl" TEXT,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "Dependant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommunityDonors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_communityId_key" ON "Community"("communityId");

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityDonors_AB_unique" ON "_CommunityDonors"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityDonors_B_index" ON "_CommunityDonors"("B");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependant" ADD CONSTRAINT "Dependant_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityDonors" ADD CONSTRAINT "_CommunityDonors_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityDonors" ADD CONSTRAINT "_CommunityDonors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
