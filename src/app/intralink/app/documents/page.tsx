import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadDocument } from "@/lib/actions/document-actions";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  const documents = await prisma.document.findMany({
    include: { uploadedBy: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Documents</h1>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">Upload a Document</h2>
          <form action={uploadDocument} className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
              <input
                name="title"
                required
                placeholder="e.g. Leave Policy 2026"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-foreground mb-1.5">File</label>
              <input
                type="file"
                name="file"
                required
                className="w-full text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors"
            >
              Upload
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-section text-left">
            <tr>
              <th className="px-5 py-3 font-semibold text-foreground">Title</th>
              <th className="px-5 py-3 font-semibold text-foreground">Uploaded by</th>
              <th className="px-5 py-3 font-semibold text-foreground">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.length === 0 && (
              <tr>
                <td className="px-5 py-4 text-muted" colSpan={4}>
                  No documents uploaded yet.
                </td>
              </tr>
            )}
            {documents.map((d) => (
              <tr key={d.id}>
                <td className="px-5 py-3 text-foreground font-medium">{d.title}</td>
                <td className="px-5 py-3 text-muted">{d.uploadedBy.name}</td>
                <td className="px-5 py-3 text-muted">{formatDate(d.createdAt)}</td>
                <td className="px-5 py-3 text-right">
                  <a
                    href={d.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy font-semibold hover:text-amber"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
