// 声明这是客户端组件
"use client";

// 导入必要的React类型
import type React from "react";

// 导入React hooks和其他必要的组件/类型
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addGuestbookEntry } from "@/lib/actions";

// 定义组件props接口
interface GuestbookFormProps {
  user: User;
}

// 导出留言板表单组件
export function GuestbookForm({ user }: GuestbookFormProps) {
  // 定义状态管理
  const [message, setMessage] = useState(""); // 留言内容状态
  const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态
  const router = useRouter(); // 路由实例

  // 处理表单提交的函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为
    if (!message.trim()) return; // 如果消息为空则返回

    setIsSubmitting(true); // 设置提交状态为true

    try {
      await addGuestbookEntry(message); // 添加留言
      setMessage(""); // 清空留言内容
      router.refresh(); // 刷新页面
    } catch (error) {
      console.error("Failed to add guestbook entry:", error); // 错误处理
    } finally {
      setIsSubmitting(false); // 重置提交状态
    }
  };

  // 渲染表单
  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      {/* 用户信息显示区域 */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {user.image ? (
            // 如果有用户头像则显示头像
            <img
              src={user.image || "/placeholder.svg"}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            // 如果没有头像则显示用户名首字母
            <span className="text-primary font-semibold">
              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </span>
          )}
        </div>
        {/* 显示用户名和邮箱 */}
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* 留言输入框 */}
      <Textarea
        placeholder="在这里留言..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[100px]"
        required
      />

      {/* 提交按钮 */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !message.trim()}>
          {isSubmitting ? "提交中..." : "签写留言"}
        </Button>
      </div>
    </form>
  );
}
