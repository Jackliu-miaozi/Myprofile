import { getGuestbookEntries } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function GuestbookEntries() {
  const entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          暂无留言。成为第一个在留言板上留言的人吧！
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {entry.user.image ? (
                  <img
                    src={entry.user.image || "/placeholder.svg"}
                    alt={entry.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-primary font-semibold text-sm">
                    {entry.user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{entry.user.name}</p>
              </div>
            </div>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(entry.createdAt)}
            </time>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{entry.message}</p>
        </div>
      ))}
    </div>
  );
}
