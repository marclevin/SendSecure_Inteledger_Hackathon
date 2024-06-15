-- CreateTable
CREATE TABLE "EssentialWallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "imageUrl" TEXT,
    "balance" DOUBLE PRECISION NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "EssentialWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependantToEssentialWallet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DependantToEssentialWallet_AB_unique" ON "_DependantToEssentialWallet"("A", "B");

-- CreateIndex
CREATE INDEX "_DependantToEssentialWallet_B_index" ON "_DependantToEssentialWallet"("B");

-- AddForeignKey
ALTER TABLE "EssentialWallet" ADD CONSTRAINT "EssentialWallet_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependantToEssentialWallet" ADD CONSTRAINT "_DependantToEssentialWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependantToEssentialWallet" ADD CONSTRAINT "_DependantToEssentialWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "EssentialWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
