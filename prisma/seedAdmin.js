import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Mouha564!', 10);

  await prisma.user.upsert({
    where: { email: 'Ilyasajouaou@outlook.com' },
    update: { password: hashedPassword },
    create: {
      email: 'Ilyasajouaou@outlook.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
