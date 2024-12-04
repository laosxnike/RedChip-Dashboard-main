import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function checkDuplicateClientNames() {
  try {
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
      console.log('\n🔍 Please resolve these duplicates before applying the migration.');
      process.exit(1); // Exit with failure status
    } else {
      console.log('✅ No duplicate Client names found. You can proceed with the migration.');
    }
  } catch (error) {
    console.error('❌ Error checking duplicate Client names:', error);
    process.exit(1); // Exit with failure status
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicateClientNames();