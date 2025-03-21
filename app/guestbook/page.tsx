import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GuestbookForm } from "@/components/guestbook-form";
import { GuestbookEntries } from "@/components/guestbook-entries";
import { SignInButton } from "@/components/sign-in-button";

export default async function GuestbookPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">留言板</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            留下你的消息，分享你的想法，或者只是打个招呼！
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {session ? (
          <GuestbookForm user={{ ...session.user!, id: session.user?.email ?? "" }} />
        ) : (
          //由于回调函数会给session一个user.id 所以不用管这个错误。
          <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
            <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
              请登录后在留言板上留言。
            </p>
            <SignInButton />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">最近留言</h2>
          <GuestbookEntries />
        </div>
      </div>
    </div>
  );
}
