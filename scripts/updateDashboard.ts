// scripts/updateDashboard.ts

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function checkDuplicateClientNames() {
  const duplicates = await prisma.$queryRaw<
    Array<{ name: string; count: number }>
  >`
    SELECT name, COUNT(*) as count
    FROM "Client"
    GROUP BY name
    HAVING COUNT(*) > 1
  `;
  
  if (duplicates.length > 0) {
    console.log('✖️  Duplicate Client Names Found:');
    duplicates.forEach((dup) => {
      console.log(`   - Name: "${dup.name}", Count: ${dup.count}`);
    });
    console.log('\n Please resolve these duplicates before proceeding.');
    process.exit(1); // Exit with failure status
  } else {
    console.log('✅ No duplicate Client names found.');
  }
}

async function main() {
  await checkDuplicateClientNames(); // Perform duplicate check first

  // Update all Dashboard records where sessions, users, or pageviews are NULL
  await prisma.dashboard.updateMany({
    where: {
      OR: [
        { sessions: null },
        { users: null },
        { pageviews: null },
      ],
    },
    data: {
      sessions: 0,
      users: 0,
      pageviews: 0,
    },
  });

  console.log('✅ Dashboard records updated successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error updating Dashboard records:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
