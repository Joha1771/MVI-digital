import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "./Icons";
import logo from "../assets/logo.svg";

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "О компании", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Как работаем", href: "#how" },
    { label: "Контакты", href: "#contact" },
  ];

  const btnBg = theme === "dark" ? "#f5f4f0" : "#0a0a0a";
  const btnColor = theme === "dark" ? "#0a0a0a" : "#f5f4f0";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4"
        style={{
          background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#hero">
            <img
              src={logo}
              alt="MVI Digital"
              style={{ height: "35px", width: "120px", objectFit: "contain" }}
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.6)")
                }
              >
                {l.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {theme === "light" ? (
                <MoonIcon size={16} color="rgba(255,255,255,0.7)" />
              ) : (
                <SunIcon size={16} color="rgba(255,255,255,0.7)" />
              )}
            </button>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-85 hover:scale-105"
              style={{
                background: btnBg,
                color: btnColor,
                transition: "background 0.35s, color 0.35s",
              }}
            >
              Заказать проект
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {theme === "light" ? (
                <MoonIcon size={16} color="rgba(255,255,255,0.7)" />
              ) : (
                <SunIcon size={16} color="rgba(255,255,255,0.7)" />
              )}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-6 h-0.5 rounded transition-all duration-300"
                  style={{
                    background: "#ffffff",
                    transform:
                      i === 0 && open
                        ? "translateY(8px) rotate(45deg)"
                        : i === 2 && open
                          ? "translateY(-8px) rotate(-45deg)"
                          : "none",
                    opacity: i === 1 && open ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "#0a0a0a" }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(false)}
                className="text-3xl font-bold"
                style={{ color: "#ffffff" }}
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
              className="px-8 py-3.5 rounded-full font-bold text-sm mt-2"
              style={{ background: btnBg, color: btnColor }}
            >
              Заказать проект
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
