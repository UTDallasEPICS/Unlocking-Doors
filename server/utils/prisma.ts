import "dotenv/config";
import { PrismaClient } from "~~/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = process.env.DATABASE_URL || "file:./dev.db";

// Remove 'file:' prefix if present for compatibility, or pass as is
const dbPath = connectionString.startsWith("file:")
  ? connectionString.substring(5)
  : connectionString;

const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
