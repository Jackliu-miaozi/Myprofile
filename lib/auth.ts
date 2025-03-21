// 导入 NextAuth.js 的类型定义
import type { NextAuthOptions } from "next-auth";
// 导入 GitHub OAuth 提供者
import GithubProvider from "next-auth/providers/github";
// 导入 Prisma 适配器，用于数据库操作
import { PrismaAdapter } from "@auth/prisma-adapter";
// 导入 Prisma 客户端
import { PrismaClient } from "@prisma/client";

// 创建 Prisma 客户端实例
const prisma = new PrismaClient();

// 导出 NextAuth.js 配置选项
export const authOptions: NextAuthOptions = {
  // 设置 Prisma 适配器用于数据库操作
  adapter: PrismaAdapter(prisma),
  // 配置认证提供者
  providers: [
    // 配置 GitHub OAuth
    GithubProvider({
      // 设置 GitHub OAuth 应用的客户端 ID
      clientId: process.env.GITHUB_ID || "",
      // 设置 GitHub OAuth 应用的客户端密钥
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  // 配置回调函数
  callbacks: {
    // 自定义会话回调
    session: ({ session, user }) => ({
      // 保留原有会话信息
      ...session,
      // 扩展用户信息
      user: {
        // 保留原有用户信息
        ...session.user,
        // 添加用户 ID
        id: user.id,
      },
    }),
    // 自定义 JWT 回调
    jwt: ({ token, user }) => {
      // 如果有用户信息，则将用户 ID 添加到 JWT 中
      if (user) {
        token.id = user.id;
      }
      // 返回修改后的 JWT
      return token;
    },
  },
  // 配置页面路由
  pages: {
    // 设置登录页面路径
    signIn: "/guestbook",
  },
};
