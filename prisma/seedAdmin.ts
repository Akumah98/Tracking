import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = "admin@intl-linelogistics.com";
  const password = "AdminPass123!";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.$executeRawUnsafe(
    `INSERT INTO AdminUser (id, email, passwordHash, name, role, createdAt)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(email) DO UPDATE SET passwordHash=excluded.passwordHash`,
    "admin-uuid-1",
    email,
    passwordHash,
    "Executive Dispatcher",
    "SUPER_ADMIN"
  );

  console.log("Admin seeded successfully:", email);
}

seedAdmin()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
