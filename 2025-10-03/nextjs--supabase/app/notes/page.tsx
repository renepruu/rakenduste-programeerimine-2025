"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
};

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // READ: fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error loading notes:", error.message);
    else setNotes(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE: insert new note
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const { error } = await supabase.from("notes").insert({ title: newTitle });
    if (error) alert(error.message);
    else {
      setNewTitle("");
      fetchNotes();
    }
  };

  // DELETE: remove a note
  const deleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) alert(error.message);
    else setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notes</h1>

      <form onSubmit={addNote} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Write a new note..."
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
        <p className="text-gray-500">Loading...</p>
      ) : notes.length > 0 ? (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-4 bg-white border rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-800">{note.title}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No notes yet.</p>
      )}
    </div>
  );
}
