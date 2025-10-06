"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
};

export default function TodoPage() {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // READ
  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error fetching todos:", error.message);
    else setTodos(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // CREATE
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const { error } = await supabase.from("todo").insert({ title: newTitle });
    if (error) alert(error.message);
    else {
      setNewTitle("");
      fetchTodos();
    }
  };

  // DELETE
  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) alert(error.message);
    else setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Todo List
      </h1>

      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-white border rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-800">{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
