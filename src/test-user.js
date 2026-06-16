//Escrow/src/test-user.js
const { PrismaClient } = require('../generated/prisma');
console.log('Before Prisma');

const prisma = new PrismaClient();
console.log('After Prisma');

async function main() {
  console.log('Inside main');
  const user = await prisma.user.create({
    data: {
      firstName: "Charity",
      lastName: "Pabazhira",
      email: "charity@example.com",
      password: "password123",
      role: "BUYER"
    }
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });