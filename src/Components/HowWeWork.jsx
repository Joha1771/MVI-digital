import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

const colors = [
  "var(--accent)",
  "var(--accent2)",
  "var(--accent-light)",
  "var(--accent3)",
  "var(--accent2)",
];

export default function HowWeWork() {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(null);

  return (
    <section
      id="how"
      style={{
        background: "var(--bg)",
        padding: "8rem 2rem",
        transition: "background 0.35s",
      }}
    >
      <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <AnimatedText
            langKey={lang}
            delay={0}
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "var(--accent2)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            {t.how.tag}
          </AnimatedText>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            <AnimatedText
              langKey={lang}
              delay={0.07}
              style={{ display: "block" }}
            >
              {t.how.title1}
            </AnimatedText>
            <AnimatedText
              langKey={lang}
              delay={0.14}
              style={{ color: "var(--text-muted)", display: "block" }}
            >
              {t.how.title2}
            </AnimatedText>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.how.steps.map((s, i) => {
            const isOpen = open === i;
            const color = colors[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  borderBottom:
                    i < t.how.steps.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "2rem",
                    alignItems: "center",
                    padding: "2rem 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      minWidth: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                      background: isOpen ? color : `${color}15`,
                      border: `1px solid ${color}40`,
                      color: isOpen ? "#fff" : color,
                      boxShadow: isOpen
                        ? `0 0 16px ${color}50`
                        : `0 0 12px ${color}20`,
                      transition: "all 0.3s",
                    }}
                  >
                    {s.n}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: isOpen ? color : "var(--text)",
                      flex: 1,
                      transition: "color 0.3s",
                    }}
                  >
                    <AnimatedText langKey={lang} delay={i * 0.06}>
                      {s.title}
                    </AnimatedText>
                  </h3>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isOpen ? `${color}20` : "var(--border)",
                      flexShrink: 0,
                      transition: "all 0.3s",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        stroke={isOpen ? color : "var(--text-muted)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <AnimatedBlock
                        langKey={lang}
                        delay={0.05}
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: 1.75,
                          color: "var(--text-sub)",
                          fontWeight: 500,
                          paddingLeft: "5rem",
                          paddingBottom: "1.75rem",
                        }}
                      >
                        {s.desc}
                      </AnimatedBlock>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
