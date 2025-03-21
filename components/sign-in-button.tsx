"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";

export function SignInButton() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/guestbook" });
  };

  return (
    <Button onClick={handleSignIn} className="flex items-center space-x-2">
      <BookMarked className="h-4 w-4" />
      <span>使用GitHub登录</span>
    </Button>
  );
}
