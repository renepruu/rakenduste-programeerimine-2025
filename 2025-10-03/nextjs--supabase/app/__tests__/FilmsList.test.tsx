// app/__tests__/filmsList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FilmsList from "@/app/films/FilmsList";
import { describe, it, expect, vi } from "vitest";

describe("FilmsList component", () => {
  // Mock data + functions
  const mockFilms = [{ id: 1, title: "First Film" }];
  const mockAddFilm = vi.fn();
  const mockUpdateFilm = vi.fn();
  const mockDeleteFilm = vi.fn();

  it("renders films correctly", () => {
    render(
      <FilmsList
        films={mockFilms}
        addFilm={mockAddFilm}
        updateFilm={mockUpdateFilm}
        deleteFilm={mockDeleteFilm}
      />
    );
    expect(screen.getByText("First Film")).toBeInTheDocument();
  });

  it("calls deleteFilm when delete button clicked", () => {
    render(
      <FilmsList
        films={mockFilms}
        addFilm={mockAddFilm}
        updateFilm={mockUpdateFilm}
        deleteFilm={mockDeleteFilm}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteFilm).toHaveBeenCalledWith(1);
  });

  it("switches to edit mode and updates film", async () => {
    render(
      <FilmsList
        films={mockFilms}
        addFilm={mockAddFilm}
        updateFilm={mockUpdateFilm}
        deleteFilm={mockDeleteFilm}
      />
    );

    // Click "Edit"
    fireEvent.click(screen.getByText("Edit"));

    // The input should appear
    const input = screen.getByDisplayValue("First Film");
    expect(input).toBeInTheDocument();

    // Change the value
    fireEvent.change(input, { target: { value: "Updated Film" } });

    // Click "Save"
    fireEvent.click(screen.getByText("Save"));

    // Expect updateFilm called with correct args
    expect(mockUpdateFilm).toHaveBeenCalledWith(1, "Updated Film");
  });
});
