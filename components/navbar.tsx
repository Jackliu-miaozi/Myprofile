"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-xl font-bold">刘亦可</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground/60"}`}
          >
            首页
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-foreground/60"}`}
          >
            关于我
          </Link>
          <Link
            href="/guestbook"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/guestbook") ? "text-primary" : "text-foreground/60"}`}
          >
            留言簿
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          ) : (
            <Link href="/guestbook">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <span className="text-xl font-bold">我的网站</span>
            </Link>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="container grid gap-6 py-6">
            <Link
              href="/"
              className={`flex items-center text-lg font-medium ${isActive("/") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`flex items-center text-lg font-medium ${isActive("/about") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/guestbook"
              className={`flex items-center text-lg font-medium ${isActive("/guestbook") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Guestbook
            </Link>

            <div className="border-t pt-4">
              {session ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    closeMenu();
                  }}
                >
                  退出登录
                </Button>
              ) : (
                <Link href="/guestbook" onClick={closeMenu} className="w-full">
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
