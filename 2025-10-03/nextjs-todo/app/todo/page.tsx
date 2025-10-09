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

  //
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // READ
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error fetching todos:", error.message);
    else setTodos(data ?? []);
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

  // UPDATE
  const updateTodo = async (id: number) => {
    if (!editTitle.trim()) return;

    const { error } = await supabase
      .from("todo")
      .update({ title: editTitle })
      // .eq - > equals
      .eq("id", id);

    setTodos(todos.map((t) => (t.id === id ? { ...t, title: editTitle } : t)));
    setEditingId(null);
    setEditTitle("");
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

      {
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-white border rounded-md shadow-sm flex justify-between items-center"
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <span>{todo.title}</span>
              )}

              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <>
                    <button onClick={() => updateTodo(todo.id)}>Save</button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditTitle(todo.title);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
