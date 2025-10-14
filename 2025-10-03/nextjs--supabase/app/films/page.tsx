// app/films/page.tsx
import { createPublicClient } from "@/lib/supabase/client";
import { createAdminClient } from "@/lib/supabase/ServerAdmin";
import { revalidatePath } from "next/cache";
import FilmsList from "./FilmsList";

export async function addFilm(formData: FormData) {
  "use server";
  const supabase = createAdminClient(); // service key client
  const title = formData.get("title") as string;
  if (!title?.trim()) return;
  await supabase.from("films").insert({ title });
  revalidatePath("/films");
}

export async function updateFilm(id: number, title: string) {
  "use server";
  const supabase = createAdminClient(); // service key client
  await supabase.from("films").update({ title }).eq("id", id);
  revalidatePath("/films");
}

export async function deleteFilm(id: number) {
  "use server";
  const supabase = createAdminClient(); // service key client
  await supabase.from("films").delete().eq("id", id);
  revalidatePath("/films");
}

export default async function FilmsPage() {
  const supabase = createPublicClient(); // anon client (for safe reads)
  const { data: films, error } = await supabase
    .from("films")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error("Supabase error:", JSON.stringify(error));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Films
      </h1>

      <FilmsList
        films={films ?? []}
        addFilm={addFilm}
        updateFilm={updateFilm}
        deleteFilm={deleteFilm}
      />
    </div>
  );
}
