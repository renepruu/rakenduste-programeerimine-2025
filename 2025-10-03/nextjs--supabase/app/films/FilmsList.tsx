// app/films/FilmsList.tsx
"use client";

import { useState } from "react";

type Film = {
  id: number;
  title: string;
};

type Props = {
  films: Film[];
  addFilm: (formData: FormData) => Promise<void>;
  updateFilm: (id: number, title: string) => Promise<void>;
  deleteFilm: (id: number) => Promise<void>;
};

export default function FilmsList({
  films,
  addFilm,
  updateFilm,
  deleteFilm,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <>
      {/* ADD FORM */}
      <form action={addFilm} className="mb-6 flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a new film..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      {/* FILMS LIST */}
      <ul className="space-y-3">
        {films.map((film) => (
          <li
            key={film.id}
            className="p-4 bg-white border rounded-md shadow-sm flex justify-between items-center"
          >
            {editingId === film.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span>{film.title}</span>
            )}

            <div className="flex gap-2">
              {editingId === film.id ? (
                <>
                  <button
                    onClick={async () => {
                      await updateFilm(film.id, editTitle);
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
                      setEditingId(film.id);
                      setEditTitle(film.title);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteFilm(film.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
