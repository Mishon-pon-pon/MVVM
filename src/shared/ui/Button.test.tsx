import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  describe("рендер по умолчанию (as=button)", () => {
    it("отображает переданный текст", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("рендерит нативный <button>", () => {
      render(<Button>Submit</Button>);
      const el = screen.getByRole("button", { name: /submit/i });
      expect(el.tagName).toBe("BUTTON");
    });

    it("применяет классы для кнопки", () => {
      render(<Button>OK</Button>);
      const el = screen.getByRole("button", { name: /ok/i });
      expect(el).toHaveClass("px-4", "py-2", "rounded-md", "bg-blue-600");
    });

    it("вызывает onClick при клике", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Submit</Button>);
      await user.click(screen.getByRole("button", { name: /submit/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("поддерживает disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
    });

    it("пробрасывает ref на DOM-элемент", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Ref</Button>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });
  });

  describe("рендер как ссылка (as=a)", () => {
    it('рендерит <a> при as="a"', () => {
      render(
        <Button as="a" href="/page">
          Link
        </Button>
      );
      const el = screen.getByRole("link", { name: /link/i });
      expect(el.tagName).toBe("A");
      expect(el).toHaveAttribute("href", "/page");
    });

    it("применяет классы для ссылки", () => {
      render(
        <Button as="a" href="#">
          Link
        </Button>
      );
      const el = screen.getByRole("link", { name: /link/i });
      expect(el).toHaveClass("text-sky-600", "underline-offset-4");
    });
  });
});
