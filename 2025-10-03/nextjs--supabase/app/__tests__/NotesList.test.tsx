import { render, screen, fireEvent } from "@testing-library/react";
import NotesList from "@/app/notes/NotesList";
import { describe, it, expect, vi } from "vitest";

describe("NotesList component", () => {
  // Mock data + functions
  const mockNotes = [{ id: 1, title: "First Note" }];
  const mockAdd = vi.fn();
  const mockUpdate = vi.fn();
  const mockDelete = vi.fn();

  it("renders notes correctly", () => {
    render(
      <NotesList
        notes={mockNotes}
        addNote={mockAdd}
        updateNote={mockUpdate}
        deleteNote={mockDelete}
      />
    );
    expect(screen.getByText("First Note")).toBeInTheDocument();
  });

  it("calls deleteNote when delete button clicked", () => {
    render(
      <NotesList
        notes={mockNotes}
        addNote={mockAdd}
        updateNote={mockUpdate}
        deleteNote={mockDelete}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("switches to edit mode and updates note", async () => {
    render(
      <NotesList
        notes={mockNotes}
        addNote={mockAdd}
        updateNote={mockUpdate}
        deleteNote={mockDelete}
      />
    );

    // Click "Edit"
    fireEvent.click(screen.getByText("Edit"));

    // The input should appear
    const input = screen.getByDisplayValue("First Note");
    expect(input).toBeInTheDocument();

    // Change the value
    fireEvent.change(input, { target: { value: "Updated Note" } });

    // Click "Save"
    fireEvent.click(screen.getByText("Save"));

    // Expect updateNote called with correct args
    expect(mockUpdate).toHaveBeenCalledWith(1, "Updated Note");
  });
});
