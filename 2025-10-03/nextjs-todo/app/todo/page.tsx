// app/todo/page.tsx
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import TodoList from "./TodoList";

console.log("Running on the server at:", new Date().toISOString());

// ✅ SERVER ACTIONS (run on the server)
export async function addTodo(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const title = formData.get("title") as string;

  if (!title?.trim()) return;
  await supabase.from("todo").insert({ title });
  revalidatePath("/todo"); // refresh data after adding
}

export async function updateTodo(id: number, title: string) {
  "use server";

  const supabase = await createClient();
  await supabase.from("todo").update({ title }).eq("id", id);
  revalidatePath("/todo");
}

export async function deleteTodo(id: number) {
  "use server";

  const supabase = await createClient();
  await supabase.from("todo").delete().eq("id", id);
  revalidatePath("/todo");
}

// ✅ PAGE COMPONENT (fetches todos server-side)
export default async function TodoPage() {
  const supabase = await createClient();

  const { data: todos, error } = await supabase
    .from("todo")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error(error);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Todo List
      </h1>

      <TodoList
        todos={todos ?? []}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
