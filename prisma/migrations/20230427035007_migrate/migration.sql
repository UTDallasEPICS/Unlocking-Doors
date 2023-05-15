-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "suffix" TEXT,
    "salutation" TEXT,
    "professionalTitle" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" INTEGER,
    "country" TEXT,
    "mainPhone" INTEGER,
    "directPhone" INTEGER,
    "mobilePhone" INTEGER,
    "emailAddress" TEXT,
    "narrative" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
