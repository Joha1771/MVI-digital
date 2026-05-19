import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "./Icons";
import { useTranslation } from "../i18n/useTranslation";

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { t, lang, setLang, langs } = useTranslation();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.how, href: "#how" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const linkColor = scrolled
    ? isDark
      ? "rgba(240,236,230,0.65)"
      : "rgba(18,16,14,0.6)"
    : "rgba(240,236,230,0.7)";
  const linkHover = scrolled ? (isDark ? "#f0ece6" : "#12100e") : "#ffffff";
  const switcherBg = scrolled
    ? isDark
      ? "rgba(201,151,58,0.08)"
      : "rgba(18,16,14,0.05)"
    : "rgba(255,255,255,0.06)";
  const switcherBorder = scrolled
    ? isDark
      ? "1px solid rgba(201,151,58,0.2)"
      : "1px solid rgba(18,16,14,0.1)"
    : "1px solid rgba(255,255,255,0.1)";
  const langTextColor = scrolled
    ? isDark
      ? "rgba(240,236,230,0.5)"
      : "rgba(18,16,14,0.45)"
    : "rgba(240,236,230,0.55)";
  const themeBtnBg = scrolled
    ? isDark
      ? "rgba(201,151,58,0.1)"
      : "rgba(18,16,14,0.06)"
    : "rgba(255,255,255,0.07)";
  const themeBtnBorder = scrolled
    ? isDark
      ? "1px solid rgba(201,151,58,0.2)"
      : "1px solid rgba(18,16,14,0.12)"
    : "1px solid rgba(255,255,255,0.1)";
  const iconColor = scrolled ? (isDark ? "#C9973A" : "#6b5a3a") : "#c9973a";
  const logoSrc = scrolled && !isDark ? "/logo-dark.svg" : "/logo-light.svg";
  const burgerColor = scrolled
    ? isDark
      ? "#C9973A"
      : "#12100e"
    : "rgba(240,236,230,0.8)";

  const LangSwitcher = ({ small }) => (
    <div
      style={{
        display: "flex",
        gap: "2px",
        background: switcherBg,
        borderRadius: "50px",
        padding: "3px",
        border: switcherBorder,
      }}
    >
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: small ? "3px 8px" : "4px 10px",
            borderRadius: "50px",
            fontSize: small ? "0.6rem" : "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: lang === l ? "#C9973A" : "transparent",
            color: lang === l ? "#0e0c0a" : langTextColor,
            textTransform: "uppercase",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1rem 2rem",
          background: scrolled
            ? isDark
              ? "rgba(14,12,10,0.95)"
              : "rgba(250,249,247,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(201,151,58,0.12)"
              : "1px solid rgba(18,16,14,0.08)"
            : "none",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="#hero">
            <img
              src={logoSrc}
              alt="MVI Digital"
              style={{
                height: "36px",
                width: "auto",
                transition: "opacity 0.3s",
              }}
            />
          </a>

          {!isMobile && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: linkColor,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = linkHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = linkColor)
                  }
                >
                  {l.label}
                </a>
              ))}
              <LangSwitcher />
              <button
                onClick={toggleTheme}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: themeBtnBg,
                  border: themeBtnBorder,
                  cursor: "pointer",
                }}
              >
                {theme === "light" ? (
                  <MoonIcon size={16} color={iconColor} />
                ) : (
                  <SunIcon size={16} color={iconColor} />
                )}
              </button>
              <a
                href="#contact"
                style={{
                  padding: "10px 20px",
                  borderRadius: "50px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  background: "#C9973A",
                  color: "#0e0c0a",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 12px rgba(201,151,58,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(201,151,58,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(201,151,58,0.3)";
                }}
              >
                {t.nav.cta}
              </a>
            </div>
          )}

          {isMobile && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <LangSwitcher small />
              <button
                onClick={toggleTheme}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: themeBtnBg,
                  border: themeBtnBorder,
                  cursor: "pointer",
                }}
              >
                {theme === "light" ? (
                  <MoonIcon size={16} color={iconColor} />
                ) : (
                  <SunIcon size={16} color={iconColor} />
                )}
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: 24,
                      height: 2,
                      borderRadius: 2,
                      background: burgerColor,
                      transform:
                        i === 0 && open
                          ? "translateY(7px) rotate(45deg)"
                          : i === 2 && open
                            ? "translateY(-7px) rotate(-45deg)"
                            : "none",
                      opacity: i === 1 && open ? 0 : 1,
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              background: "#0e0c0a",
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(false)}
                style={{ fontSize: "2rem", fontWeight: 800, color: "#f0ece6" }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              onClick={() => setOpen(false)}
              style={{
                padding: "12px 32px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.875rem",
                background: "#C9973A",
                color: "#0e0c0a",
              }}
            >
              {t.nav.cta}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
