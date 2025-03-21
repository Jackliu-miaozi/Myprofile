import type React from "react";

import { Inter, Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { AuthStatusListener } from "@/components/auth-status-listener";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const sourceHanSerifSC = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "刘亦可的网站",
  description: "一个包含首页、关于我和留言板的个人网站",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={sourceHanSerifSC.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthStatusListener />
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <div className={`container mx-auto flex-1 ${inter.className}`}>{children}</div>
              <footer className="w-full border-t py-6 md:py-0">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} 我的个人网站. 保留所有权利.
                  </p>
                </div>
              </footer>
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
