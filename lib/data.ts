// 需要先安装 Prisma 客户端依赖
// 运行: npm install @prisma/client
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getGuestbookEntries() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      take: 50,
    });

    return entries;
  } catch (error) {
    console.error("Failed to fetch guestbook entries:", error);
    return [];
  }
}
