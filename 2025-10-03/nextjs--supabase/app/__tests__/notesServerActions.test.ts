// app/__tests__/notesServerActions.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { addNote, updateNote, deleteNote } from "@/app/notes/page";

// ------------------------
// MOCK NEXT REVALIDATE PATH
// ------------------------
const mockRevalidatePath = vi.fn();
vi.mock("next/cache", () => ({
  revalidatePath: (path: string) => mockRevalidatePath(path),
}));

// ------------------------
// MOCK SUPABASE SERVER CLIENT
// ------------------------
const mockEq = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn(() => ({ eq: mockEq }));
const mockDelete = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
}));

vi.mock("@/lib/supabase/ServerAdmin", () => ({
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

// ------------------------
// TESTS
// ------------------------
describe("Server actions - Notes CRUD", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a note with a title", async () => {
    const formData = new FormData();
    formData.append("title", "New Note");

    await addNote(formData);

    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(mockInsert).toHaveBeenCalledWith({ title: "New Note" });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/notes");
  });

  it("should not add a note with empty title", async () => {
    const formData = new FormData();
    formData.append("title", "   "); // whitespace only

    await addNote(formData);

    expect(mockInsert).not.toHaveBeenCalled();
    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });

  it("should update a note by id", async () => {
    await updateNote(5, "Updated Title");

    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(mockUpdate).toHaveBeenCalledWith({ title: "Updated Title" });
    expect(mockEq).toHaveBeenCalledWith("id", 5);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/notes");
  });

  it("should delete a note by id", async () => {
    await deleteNote(7);

    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith("id", 7);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/notes");
  });
});
