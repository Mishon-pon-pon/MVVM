import { describe, it, expect } from "vitest";
import { render, screen } from "@/test-utils";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders home page text", () => {
    render(<HomePage />);
    expect(screen.getByText(/this is home page/i)).toBeInTheDocument();
  });
});
