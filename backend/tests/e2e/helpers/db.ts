import { PrismaClient } from "@prisma/client";

import { TEST_DB_URL } from "../../../playwright.config.js";

let prisma: PrismaClient | null = null;

export function testPrisma(): PrismaClient {
  if (prisma) return prisma;

  prisma = new PrismaClient({
    datasources: { db: { url: TEST_DB_URL } },
    log: ["error"],
  });

  return prisma;
}

export async function resetDb(): Promise<void> {
  await testPrisma().event.deleteMany();
}

export async function disconnectDb(): Promise<void> {
  if (!prisma) return;

  await prisma.$disconnect();
  prisma = null;
}
