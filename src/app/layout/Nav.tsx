import type { FC } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportedLocales, type SupportedLocale } from "@/app/i18n";

interface IProps {}

export const Nav: FC<IProps> = React.memo(() => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: SupportedLocale) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Link to="/">{t("nav.home")}</Link>
      <Link to="/counter">{t("nav.counter")}</Link>
      <span style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
        <span>{t("nav.language")}:</span>
        {supportedLocales.map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => changeLanguage(lng)}
            style={{
              fontWeight: i18n.language === lng ? "bold" : "normal",
              padding: "2px 8px",
            }}
          >
            {lng === "en" ? "EN" : "RU"}
          </button>
        ))}
      </span>
    </nav>
  );
});

Nav.displayName = "Nav";
