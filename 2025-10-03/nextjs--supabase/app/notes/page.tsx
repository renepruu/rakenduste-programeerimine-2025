// app/notes/page.tsx
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import NotesList from "./NotesList";

export async function addNote(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  await supabase.from("notes").insert({ title });
  revalidatePath("/notes");
}

export async function updateNote(id: number, title: string) {
  "use server";

  const supabase = await createClient();
  await supabase.from("notes").update({ title }).eq("id", id);
  revalidatePath("/notes");
}

export async function deleteNote(id: number) {
  "use server";

  const supabase = await createClient();
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/notes");
}

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error(error);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Notes
      </h1>

      <NotesList
        notes={notes ?? []}
        addNote={addNote}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}
