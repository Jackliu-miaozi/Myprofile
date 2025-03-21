import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        {/* 炫酷的英雄区域 */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          {/* 背景渐变效果 - 红色主题 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-0"></div>

          {/* 动态背景圆形 - 红色主题 */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 animate-fade-in">
                <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 animate-slide-up relative overflow-hidden group">
                  <span className="">欢迎来到我的个人空间</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                </div>
                <h1>
                  <span className="relative inline-block animate-text-reveal overflow-hidden">
                    <span className="relative text-4xl lg:text-7xl z-10 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-text-gradient">
                      Jack Liu 的网站
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-indigo-500/20 blur-sm animate-text-glow"></span>
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 animate-fade-in-delay">
                  这里是我分享想法、经历，并通过留言板与访客交流的地方。
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="h-12 px-6 hover-glow border-primary/20 hover:border-primary/50"
                  >
                    了解我
                  </Button>
                </Link>
                <Link href="/guestbook">
                  <Button className="h-12 px-6 hover-glow group">
                    访问留言板
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 装饰性元素 - 红色主题 */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </section>

        {/* 特色区域 */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background z-0"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                探索我的世界
              </h2>
              <div className="flex items-center justify-center mt-4">
                <span className="h-px w-12 bg-primary/30"></span>
                <Sparkles className="h-5 w-5 mx-2 text-primary" />
                <span className="h-px w-12 bg-primary/30"></span>
              </div>
              <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
                发现更多关于我的内容和我能提供的服务
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 items-stretch">
              {/* 关于我卡片 - 红色主题 */}
              <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-background p-6 shadow-sm hover-glow hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">关于我</h3>
                  <p className="text-muted-foreground mb-4">了解更多关于我的背景和兴趣爱好。</p>
                  <Link
                    href="/about"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    查看详情
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* 留言板卡片 - 红色主题 */}
              <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-background p-6 shadow-sm hover-glow hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">留言板</h3>
                  <p className="text-muted-foreground mb-4">登录并在我的留言板上留言。</p>
                  <Link
                    href="/guestbook"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    前往留言
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* 联系我卡片 - 红色主题 */}
              <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-background p-6 shadow-sm hover-glow hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">联系我</h3>
                  <p className="text-muted-foreground mb-4">在社交媒体和其他平台上与我联系。</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    联系方式
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 新增：引人注目的行动号召区域 - 红色主题 */}
        <section className="w-full py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-background z-0"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-sm">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">想了解更多？</h2>
                <p className="text-muted-foreground">欢迎随时联系我，我很乐意与您交流</p>
              </div>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-8 hover-glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary neon-box"
                >
                  立即联系
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
