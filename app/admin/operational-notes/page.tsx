import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { createNote, deleteNote } from "@/lib/actions/operational-note";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Operational Notes",
};

const typeColors: Record<string, string> = {
  routine: "border-l-green-500 bg-green-50 text-green-800",
  emergency: "border-l-red-500 bg-red-50 text-red-800",
  inventory: "border-l-orange-500 bg-orange-50 text-orange-800",
  general: "border-l-blue-500 bg-blue-50 text-blue-800",
};

export default async function OperationalNotesPage() {
  const session = await auth();
  const notes = await prisma.operationalNote.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Operational Notes
      </h1>

      <form
        action={createNote}
        className="mt-8 rounded-[24px] border border-border/20 bg-card p-6 shadow-sm"
      >
        <h2 className="font-heading text-xl font-bold text-foreground">
          Add Note
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            name="author"
            placeholder="Author"
            defaultValue={session?.user?.name || "Admin"}
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <select
            name="type"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="routine">Routine</option>
            <option value="emergency">Emergency</option>
            <option value="inventory">Inventory</option>
            <option value="general">General</option>
          </select>
          <textarea
            name="content"
            placeholder="Note content..."
            required
            rows={4}
            className="min-h-[100px] w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2"
          />
        </div>
        <button className="mt-6 rounded-xl bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95">
          Add Note
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`rounded-xl border-l-4 p-4 ${typeColors[note.type] || typeColors.general}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium capitalize">
                  {note.type}
                </span>
                <span className="ml-2 text-xs opacity-70">{note.author}</span>
              </div>
              <form action={deleteNote.bind(null, note.id)}>
                <button className="text-xs text-red-600 hover:underline">
                  Delete
                </button>
              </form>
            </div>
            <p className="mt-2 text-sm whitespace-pre-wrap">{note.content}</p>
            <p className="mt-2 text-xs opacity-50">
              {note.createdAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-sm text-muted">No notes yet.</p>
        )}
      </div>
    </div>
  );
}
