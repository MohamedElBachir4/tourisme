-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('guesthouse', 'eco_camp', 'green_hotel');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'rejected', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('new', 'read', 'archived');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "wilaya" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "longDescription" JSONB NOT NULL,
    "activities" JSONB NOT NULL,
    "accommodations" JSONB NOT NULL,
    "coverImage" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationImage" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" JSONB NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DestinationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "longDescription" JSONB NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "basePriceDzd" DECIMAL(12,2) NOT NULL,
    "accommodationLabel" JSONB NOT NULL,
    "category" JSONB NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "activities" JSONB NOT NULL,
    "itinerary" JSONB NOT NULL DEFAULT '[]',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "AccommodationType" NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "pricePerNightDzd" DECIMAL(12,2) NOT NULL,
    "destinationId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "priceDzd" DECIMAL(12,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "priceDzd" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "emissionKgPerKm" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "forPlanner" BOOLEAN NOT NULL DEFAULT true,
    "forCarbon" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "tripId" TEXT,
    "destinationId" TEXT,
    "accommodationId" TEXT,
    "transportId" TEXT,
    "plannerPayload" JSONB NOT NULL DEFAULT '{}',
    "travelers" INTEGER NOT NULL,
    "nights" INTEGER NOT NULL DEFAULT 1,
    "travelDate" DATE NOT NULL,
    "estimatedTotalDzd" DECIMAL(12,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingActivity" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "BookingActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSurvey" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "preferredTransport" TEXT NOT NULL,
    "preferredAccommodation" TEXT NOT NULL,
    "interestEcoActivities" BOOLEAN NOT NULL,
    "environmentalAwareness" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionFactor" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "kgPerKm" DECIMAL(10,4) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmissionFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE INDEX "Destination_published_sortOrder_idx" ON "Destination"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "DestinationImage_destinationId_sortOrder_idx" ON "DestinationImage"("destinationId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");

-- CreateIndex
CREATE INDEX "Trip_destinationId_idx" ON "Trip"("destinationId");

-- CreateIndex
CREATE INDEX "Trip_published_sortOrder_idx" ON "Trip"("published", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_code_key" ON "Accommodation"("code");

-- CreateIndex
CREATE INDEX "Accommodation_active_idx" ON "Accommodation"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_code_key" ON "Activity"("code");

-- CreateIndex
CREATE INDEX "Activity_active_idx" ON "Activity"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_code_key" ON "Transport"("code");

-- CreateIndex
CREATE INDEX "Transport_active_idx" ON "Transport"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_reference_key" ON "Booking"("reference");

-- CreateIndex
CREATE INDEX "Booking_status_createdAt_idx" ON "Booking"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "BookingActivity_bookingId_activityId_key" ON "BookingActivity"("bookingId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingSurvey_bookingId_key" ON "BookingSurvey"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "EmissionFactor_code_key" ON "EmissionFactor"("code");

-- CreateIndex
CREATE INDEX "EmissionFactor_active_sortOrder_idx" ON "EmissionFactor"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "DestinationImage" ADD CONSTRAINT "DestinationImage_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "Transport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingActivity" ADD CONSTRAINT "BookingActivity_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingActivity" ADD CONSTRAINT "BookingActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSurvey" ADD CONSTRAINT "BookingSurvey_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

