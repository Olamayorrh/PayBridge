require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

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