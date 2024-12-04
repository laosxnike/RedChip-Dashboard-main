import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

dotenv.config();
const prisma = new PrismaClient();

async function createDefaultClient() {
  try {
    const client = await prisma.client.upsert({
      where: {
        id: 'default_client_id', // Use this same ID in googleAnalytics.ts
      },
      update: {},
      create: {
        id: 'default_client_id',
        name: 'Default Client',
      },
    });
    
    console.log('✅ Default client created/verified:', client);
    return client.id;
  } catch (error) {
    console.error('❌ Error creating default client:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to check if the script is run directly
async function isMainModule() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return process.argv[1] === resolve(__filename);
}

(async () => {
  if (await isMainModule()) {
    await createDefaultClient();
  }
})();

export { createDefaultClient };