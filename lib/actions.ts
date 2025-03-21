"use server"; // 声明这是一个服务器端组件/函数

// 导入必要的依赖
import { revalidatePath } from "next/cache"; // 用于重新验证页面缓存
import { getServerSession } from "next-auth"; // 用于获取服务器端的会话信息
import { PrismaClient } from "@prisma/client"; // 导入Prisma客户端
import { authOptions } from "@/lib/auth"; // 导入认证配置

// 初始化Prisma客户端实例
const prisma = new PrismaClient();

// 导出添加留言簿条目的异步函数
export async function addGuestbookEntry(message: string) {
  // 获取当前用户的会话信息
  const session = await getServerSession(authOptions);

  // 检查用户是否已登录
  if (!session || !session.user) {
    throw new Error("You must be signed in to add a guestbook entry");
  }

  // 使用Prisma创建新的留言簿条目
  const entry = await prisma.guestbookEntry.create({
    data: {
      message, // 保存留言内容
      user: {
        connect: {
          email: session.user.email as string, // 关联到当前用户的email
        },
      },
    },
  });

  // 重新验证留言簿页面的缓存
  revalidatePath("/guestbook");
  // 返回创建的条目
  return entry;
}
