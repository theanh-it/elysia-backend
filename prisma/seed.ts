import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { users } from "./tables/users";

const main = async () => {
  try {
    await prisma.user.createMany({ data: users });
    console.log("Inserted users");

    return prisma.$disconnect();
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

main();
