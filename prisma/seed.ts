import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@synapsite.pl"
  const password = process.env.ADMIN_PASSWORD || "admin123"

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: "Admin",
    },
  })

  console.log(`Admin user created/updated: ${user.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
