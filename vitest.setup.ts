import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import i18n from "./src/app/i18n";

expect.extend(matchers);
afterEach(() => {
  cleanup();
});

// Use English in tests for stable assertions
i18n.changeLanguage("en");
