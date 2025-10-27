// lib/prisma.js
import { PrismaClient } from '@prisma/client'

let globalForPrisma = global

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}

export default globalForPrisma.prisma
