import { PrismaClient } from '@prisma/client';
import { tools } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  for (const tool of tools) {
    const existingTool = await prisma.tool.findFirst({
      where: {
        href: tool.href
      }
    });

    if (!existingTool) {
      await prisma.tool.create({
        data: tool
      });
      console.log(`Created tool: ${tool.name}`);
    } else {
      console.log(`Tool already exists: ${tool.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });