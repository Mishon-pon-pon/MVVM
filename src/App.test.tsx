import { describe, it, expect } from "vitest";
import { render, screen } from "@/testing/test-utils";
import { App } from "./App";

describe("App", () => {
  it("renders navigation", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /counter/i })).toBeInTheDocument();
  });

  it("renders home page at /", () => {
    render(<App />);
    expect(screen.getByText(/this is home page/i)).toBeInTheDocument();
  });
});
