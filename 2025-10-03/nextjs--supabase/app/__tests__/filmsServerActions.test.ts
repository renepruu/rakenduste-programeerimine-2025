// app/__tests__/filmsServerActions.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { addFilm, updateFilm, deleteFilm } from "@/app/films/page";

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
describe("Server actions - Films CRUD", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a film with a title", async () => {
    const formData = new FormData();
    formData.append("title", "New Film");

    await addFilm(formData);

    expect(mockFrom).toHaveBeenCalledWith("films");
    expect(mockInsert).toHaveBeenCalledWith({ title: "New Film" });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/films");
  });

  it("should not add a film with empty title", async () => {
    const formData = new FormData();
    formData.append("title", "   "); // whitespace only

    await addFilm(formData);

    expect(mockInsert).not.toHaveBeenCalled();
    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });

  it("should update a film by id", async () => {
    await updateFilm(5, "Updated Film Title");

    expect(mockFrom).toHaveBeenCalledWith("films");
    expect(mockUpdate).toHaveBeenCalledWith({ title: "Updated Film Title" });
    expect(mockEq).toHaveBeenCalledWith("id", 5);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/films");
  });

  it("should delete a film by id", async () => {
    await deleteFilm(7);

    expect(mockFrom).toHaveBeenCalledWith("films");
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith("id", 7);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/films");
  });
});
