-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ORGANIZER', 'DBA7', 'DRIVER', 'DONOR');

-- CreateEnum
CREATE TYPE "SacrificeStatus" AS ENUM ('pending', 'onWay', 'delivred', 'sacrifiedc', 'cancelled');

-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('uploaded', 'failed', 'confirmed', 'sent', 'processing', 'processing_failed');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'succeeded', 'failed');

-- CreateEnum
CREATE TYPE "GatewayEnum" AS ENUM ('STRIPE', 'PAYPAL', 'CIB', 'CASH');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('pending', 'sent', 'failed');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "gateway" "GatewayEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDonationTransaction" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDonationTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sacrifice" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "status" "SacrificeStatus" NOT NULL,
    "currentLocationId" TEXT,
    "sacrificeVideoId" TEXT NOT NULL,
    "sacrificedById" TEXT,
    "year" INTEGER NOT NULL,
    "slayedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sacrifice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sacrificerSacrficesCount" (
    "id" TEXT NOT NULL,
    "sacrificerId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "doneCount" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sacrificerSacrficesCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sacrificeVideo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "blurUrl" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "status" "VideoStatus" NOT NULL,

    CONSTRAINT "sacrificeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userDonationTransaction_transactionId_key" ON "userDonationTransaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "sacrifice_sacrificeVideoId_key" ON "sacrifice"("sacrificeVideoId");

-- CreateIndex
CREATE UNIQUE INDEX "sacrificerSacrficesCount_sacrificerId_year_key" ON "sacrificerSacrficesCount"("sacrificerId", "year");

-- AddForeignKey
ALTER TABLE "userDonationTransaction" ADD CONSTRAINT "userDonationTransaction_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDonationTransaction" ADD CONSTRAINT "userDonationTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacrifice" ADD CONSTRAINT "sacrifice_sacrificedById_fkey" FOREIGN KEY ("sacrificedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacrifice" ADD CONSTRAINT "sacrifice_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacrifice" ADD CONSTRAINT "sacrifice_currentLocationId_fkey" FOREIGN KEY ("currentLocationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacrifice" ADD CONSTRAINT "sacrifice_sacrificeVideoId_fkey" FOREIGN KEY ("sacrificeVideoId") REFERENCES "sacrificeVideo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacrificerSacrficesCount" ADD CONSTRAINT "sacrificerSacrficesCount_sacrificerId_fkey" FOREIGN KEY ("sacrificerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
