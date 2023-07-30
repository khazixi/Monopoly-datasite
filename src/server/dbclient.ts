import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
})

// TODO: Replace with a logging library?
prisma.$on('warn', e => console.log(e))
prisma.$on('error', e => console.log(e))
prisma.$on('info', e => console.log(e))

export default prisma
