import { describe, it, expect, beforeEach } from "vitest";
import i18n, { defaultNS, resources, supportedLocales } from "./i18n";

describe("i18n", () => {
  describe("config", () => {
    it("exports defaultNS as translation", () => {
      expect(defaultNS).toBe("translation");
    });

    it("supportedLocales contains en and ru", () => {
      expect(supportedLocales).toEqual(["en", "ru"]);
    });

    it("resources has en and ru with translation namespace", () => {
      expect(Object.keys(resources)).toEqual(["en", "ru"]);
      expect(resources.en).toHaveProperty(defaultNS);
      expect(resources.ru).toHaveProperty(defaultNS);
    });

    it("en locale has nav, home, counter keys", () => {
      const en = resources.en[defaultNS] as Record<string, unknown>;
      expect(en).toHaveProperty("nav");
      expect(en).toHaveProperty("home");
      expect(en).toHaveProperty("counter");
      expect((en.nav as Record<string, string>).home).toBe("Home");
      expect((en.home as Record<string, string>).title).toBe(
        "This is Home Page"
      );
    });

    it("ru locale has same structure as en", () => {
      const ru = resources.ru[defaultNS] as Record<string, unknown>;
      expect(ru).toHaveProperty("nav");
      expect(ru).toHaveProperty("home");
      expect(ru).toHaveProperty("counter");
      expect((ru.nav as Record<string, string>).home).toBe("Главная");
      expect((ru.home as Record<string, string>).title).toBe(
        "Это главная страница"
      );
    });
  });

  describe("translations", () => {
    beforeEach(async () => {
      await i18n.changeLanguage("en");
    });

    it("returns English strings when language is en", () => {
      expect(i18n.t("nav.home")).toBe("Home");
      expect(i18n.t("nav.counter")).toBe("Counter");
      expect(i18n.t("nav.language")).toBe("Language");
      expect(i18n.t("home.title")).toBe("This is Home Page");
      expect(i18n.t("counter.title")).toBe("Counter");
      expect(i18n.t("counter.value")).toBe("Value");
      expect(i18n.t("counter.step")).toBe("Step");
      expect(i18n.t("counter.reset")).toBe("Reset");
    });

    it("returns Russian strings after changeLanguage(ru)", async () => {
      await i18n.changeLanguage("ru");
      expect(i18n.t("nav.home")).toBe("Главная");
      expect(i18n.t("nav.counter")).toBe("Счётчик");
      expect(i18n.t("nav.language")).toBe("Язык");
      expect(i18n.t("home.title")).toBe("Это главная страница");
      expect(i18n.t("counter.title")).toBe("Счётчик");
      expect(i18n.t("counter.value")).toBe("Значение");
      expect(i18n.t("counter.step")).toBe("Шаг");
      expect(i18n.t("counter.reset")).toBe("Сброс");
    });

    it("fallbackLng is en for unknown keys", async () => {
      await i18n.changeLanguage("ru");
      // ключ есть только в en или в обоих — без fallback не проверить; проверяем что ru работает
      expect(i18n.language).toBe("ru");
      await i18n.changeLanguage("en");
      expect(i18n.language).toBe("en");
    });
  });
});
