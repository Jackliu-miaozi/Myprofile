"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export function AuthStatusListener() {
  const { data: session } = useSession();
  const { toast } = useToast();
  // 使用useRef来跟踪上一次的会话状态
  const prevSessionRef = useRef<typeof session>(null);

  useEffect(() => {
    // 首次加载时，如果已经有会话状态，则记录下来
    if (prevSessionRef.current === null) {
      prevSessionRef.current = session as typeof prevSessionRef.current;
    }
    // 只有当状态从未登录变为已登录时才显示登录提示
    else if (!prevSessionRef.current?.user && session?.user) {
      // 更新上一次的会话状态
      prevSessionRef.current = session;
      toast({
        title: "登录成功",
        description: "欢迎回来！",
        variant: "default",
      });
    }
    // 只有当状态从已登录变为未登录时才显示退出提示
    if (prevSessionRef.current?.user && !session) {
      // 更新上一次的会话状态
      prevSessionRef.current = session;
      toast({
        title: "退出登录成功",
        description: "再见！",
        variant: "default",
      });
    }
    // 更新上一次的会话状态
    prevSessionRef.current = session;
  }, [session, toast]);

  // 这个组件不渲染任何内容，只监听会话状态
  return null;
}
