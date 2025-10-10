"use client";

import { useState } from "react";

type Todo = {
  id: number;
  title: string;
};

type Props = {
  todos: Todo[];
  addTodo: (formData: FormData) => Promise<void>;
  updateTodo: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

export default function TodoList({
  todos,
  addTodo,
  updateTodo,
  deleteTodo,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <>
      {/* ADD FORM */}
      <form action={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          name="title"
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

      {/* TODO LIST */}
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
                  <button
                    onClick={async () => {
                      await updateTodo(todo.id, editTitle);
                      setEditingId(null);
                      setEditTitle("");
                    }}
                  >
                    Save
                  </button>
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
    </>
  );
}
