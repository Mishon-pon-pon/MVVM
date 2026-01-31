import { describe, it, expect } from "vitest";
import { render, screen } from "@/testing/test-utils";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders Home link", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders counter link", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /counter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /counter/i })).toHaveAttribute(
      "href",
      "/counter"
    );
  });
});
