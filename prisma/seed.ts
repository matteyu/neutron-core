const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Electric Boost", description: "Supercharge your day", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6), requireAdmin: true },
    { name: "Neon Surge", description: "Illuminate your potential", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6), requireAdmin: true },
    { name: "Volt Vibe", description: "Feel the energy", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6), requireAdmin: true },
    { name: "Plasma Pulse", description: "Electrify your senses", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6), requireAdmin: true },
    { name: "Thunder Thrill", description: "Experience the power", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6) },
    { name: "Spark Sync", description: "Connect with intensity", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * 6) },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
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