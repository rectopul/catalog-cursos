-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_name" TEXT NOT NULL,
    "validity" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);
