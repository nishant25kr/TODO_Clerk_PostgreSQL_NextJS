import { PrismaClient } from "@prisma/client/extension"

const prismaClientSingleton = () => {
    return new PrismaClient()
}

const globalforPrisma = global as unknown as { prisma: PrismaClient | undefined };

const prisma = globalforPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV != "production") globalforPrisma.prisma = prisma;


