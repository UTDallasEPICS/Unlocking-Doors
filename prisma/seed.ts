import "dotenv/config";
import { prisma } from "../server/utils/prisma";

async function main() {
  const adminEmail = process.env.SEED_EMAIL || "samuel.ma@npts.tech";

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        permission: "ADMIN",
        name: "Default Admin",
      },
    });
    console.log(`\n==================================================`);
    console.log(`Successfully seeded default administrator user: ${admin.email}`);
    console.log(`==================================================\n`);
  } else {
    console.log(`User ${adminEmail} already exists.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
