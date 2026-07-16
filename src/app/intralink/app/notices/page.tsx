import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { postNotice } from "@/lib/actions/notice-actions";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function NoticesPage() {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  const notices = await prisma.notice.findMany({
    include: { postedBy: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Notice Board</h1>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">Post a Notice</h2>
          <form action={postNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
              <input
                name="title"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                name="body"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors"
            >
              Post Notice
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {notices.length === 0 && <p className="text-muted">No notices posted yet.</p>}
        {notices.map((n) => (
          <div key={n.id} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-1">{n.title}</h3>
            <p className="text-xs text-muted mb-3">
              {n.postedBy.name} &middot; {formatDate(n.createdAt)}
            </p>
            <p className="text-sm text-muted whitespace-pre-line">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
