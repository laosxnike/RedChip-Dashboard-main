import { PrismaClient } from '@prisma/client';
import { clients } from '../lib/clients';

const prisma = new PrismaClient();

async function main() {
  // Fetch existing clients
  const existingClients = await prisma.client.findMany();

  // Ensure all existing clients are in the clients list
  for (const client of existingClients) {
    if (!clients.includes(client.name)) {
      console.warn(`Client name "${client.name}" is not in the predefined clients list.`);
      // Handle as needed, e.g., delete, update, or notify
    }
  }

  console.log('Existing clients verified against the predefined list.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 