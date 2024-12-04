import { PrismaClient } from '@prisma/client';
import { clients } from '../lib/clients.js';

const prisma = new PrismaClient();

async function main() {
  for (const clientName of clients) {
    await prisma.client.upsert({
      where: { name: clientName },
      update: {},
      create: { name: clientName },
    });
    console.log(`Upserted client: ${clientName}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
