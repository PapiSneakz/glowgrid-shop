-- Add updatedAt column to Product (for existing rows, default to now)
ALTER TABLE "Product"
ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now();

-- Add name and updatedAt columns to User
ALTER TABLE "User"
ADD COLUMN "name" TEXT;

ALTER TABLE "User"
ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now();
