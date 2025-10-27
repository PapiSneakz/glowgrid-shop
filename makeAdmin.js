import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function makeAdmin(email) {
  const user = await prisma.user.update({
    where: { email },
    data: { role: 'admin' },
  });
  console.log('✅ Updated to admin:', user);
}

makeAdmin('YOUR_EMAIL@example.com')
  .catch(console.error)
  .finally(() => prisma.$disconnect());
