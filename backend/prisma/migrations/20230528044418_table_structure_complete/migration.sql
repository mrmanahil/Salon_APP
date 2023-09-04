/*
  Warnings:

  - Added the required column `user_type_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "barber" (
    "barber_id" SERIAL NOT NULL,
    "barber_name" TEXT NOT NULL,
    "total_experience_in_years" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "barber_pkey" PRIMARY KEY ("barber_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "shop" (
    "shop_id" SERIAL NOT NULL,
    "shop_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "service" (
    "service_id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_image_url" TEXT NOT NULL,
    "service_price" INTEGER NOT NULL,
    "service_duration_in_minutes" INTEGER NOT NULL,
    "service_discount_price" INTEGER NOT NULL,
    "has_discount" BOOLEAN NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "barber_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "booking_total_amount" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "booking_schedule" (
    "booking_schedule_id" SERIAL NOT NULL,
    "booking_day_of_the_week" TEXT NOT NULL,
    "booking_date" TEXT NOT NULL,
    "booking_start_time" TEXT NOT NULL,
    "booking_end_time" TEXT NOT NULL,
    "booking_id" INTEGER NOT NULL,

    CONSTRAINT "booking_schedule_pkey" PRIMARY KEY ("booking_schedule_id")
);

-- CreateTable
CREATE TABLE "lookup" (
    "lookup_id" SERIAL NOT NULL,
    "lookup_type_id" INTEGER NOT NULL,
    "lookup_type" TEXT NOT NULL,
    "lookup_type_desc" TEXT NOT NULL,

    CONSTRAINT "lookup_pkey" PRIMARY KEY ("lookup_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barber_user_id_key" ON "barber"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_user_id_key" ON "customer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_user_id_key" ON "shop"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "booking_schedule_booking_id_key" ON "booking_schedule"("booking_id");

-- AddForeignKey
ALTER TABLE "barber" ADD CONSTRAINT "barber_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop" ADD CONSTRAINT "shop_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop"("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop"("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "barber"("barber_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_schedule" ADD CONSTRAINT "booking_schedule_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
