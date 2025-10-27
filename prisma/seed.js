import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 🗂️ Create categories
  const lighting = await prisma.category.create({
    data: { name: 'Lighting' },
  });
  const accessories = await prisma.category.create({
    data: { name: 'Accessories' },
  });

  // 🛒 Products
  await prisma.product.createMany({
    data: [
      {
        name: 'GlowBars 3-pack',
        price: 49.99,
        description: 'RGB light bars for desk',
        image: '/products/lightbar.jpg',
        categoryId: lighting.id,
      },
      {
        name: 'HoverMat Wireless',
        price: 59.99,
        description: 'LED desk mat with wireless charging',
        image: '/products/chargingpad.jpg',
        categoryId: accessories.id,
      },
      {
        name: 'LinkCable Magnetic',
        price: 19.99,
        description: 'Magnetic charging cable',
        image: '/products/cableorganizer.jpg',
        categoryId: accessories.id,
      },
      {
        name: 'AuraBlock Starter 4',
        price: 79.99,
        description: 'Modular LED wall panels',
        image: '/products/deskmats.jpg',
        categoryId: lighting.id,
      },
    ],
  });

  console.log('✅ Products and categories seeded');

  // 👑 Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'ilyasajouaou@outlook.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'ilyasajouaou@outlook.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created (email: ilyasajouaou@outlook.com | password: admin123)');
  console.log('🌟 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
