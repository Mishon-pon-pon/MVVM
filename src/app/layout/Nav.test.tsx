import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, userEvent } from "@/testing/test-utils";
import i18n from "@/app/i18n";
import { Nav } from "./Nav";

const user = userEvent.setup();

describe("Nav", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
  });

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

  describe("i18n", () => {
    it("renders nav labels in English by default", () => {
      render(<Nav />);
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Counter" })).toBeInTheDocument();
      expect(screen.getByText(/language:/i)).toBeInTheDocument();
    });

    it("switches to Russian after clicking RU button", async () => {
      render(<Nav />);
      await user.click(screen.getByRole("button", { name: "RU" }));
      expect(screen.getByRole("link", { name: "Главная" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Счётчик" })).toBeInTheDocument();
      expect(screen.getByText(/язык:/i)).toBeInTheDocument();
    });

    it("switches back to English after clicking EN when in Russian", async () => {
      await i18n.changeLanguage("ru");
      render(<Nav />);
      await user.click(screen.getByRole("button", { name: "EN" }));
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Counter" })).toBeInTheDocument();
    });
  });
});
