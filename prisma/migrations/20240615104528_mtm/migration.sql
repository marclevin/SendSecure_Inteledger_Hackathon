/*
  Warnings:

  - You are about to drop the `_DependantToEssentialWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DependantToEssentialWallet" DROP CONSTRAINT "_DependantToEssentialWallet_A_fkey";

-- DropForeignKey
ALTER TABLE "_DependantToEssentialWallet" DROP CONSTRAINT "_DependantToEssentialWallet_B_fkey";

-- DropTable
DROP TABLE "_DependantToEssentialWallet";

-- CreateTable
CREATE TABLE "_DependantWallets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DependantWallets_AB_unique" ON "_DependantWallets"("A", "B");

-- CreateIndex
CREATE INDEX "_DependantWallets_B_index" ON "_DependantWallets"("B");

-- AddForeignKey
ALTER TABLE "_DependantWallets" ADD CONSTRAINT "_DependantWallets_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependantWallets" ADD CONSTRAINT "_DependantWallets_B_fkey" FOREIGN KEY ("B") REFERENCES "EssentialWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
