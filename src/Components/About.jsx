import { motion } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

const colors = ["var(--accent)", "var(--accent2)", "var(--accent3)"];

export default function About() {
  const { t, lang } = useTranslation();

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        padding: "8rem 2rem",
        transition: "background 0.35s",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div className="divider" style={{ marginBottom: "5rem" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="md:grid-cols-2"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
              {t.about.tag}
            </AnimatedText>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              <AnimatedText
                langKey={lang}
                delay={0.05}
                style={{ display: "block" }}
              >
                {t.about.title1}
              </AnimatedText>
              <AnimatedText
                langKey={lang}
                delay={0.1}
                style={{ color: "var(--text-muted)", display: "block" }}
              >
                {t.about.title2}
              </AnimatedText>
            </h2>
            <AnimatedBlock
              langKey={lang}
              delay={0.15}
              style={{
                color: "var(--text-sub)",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              {t.about.p1}
            </AnimatedBlock>
            <AnimatedBlock
              langKey={lang}
              delay={0.2}
              style={{
                color: "var(--text-sub)",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              {t.about.p2}
            </AnimatedBlock>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--accent2)",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "0.75rem")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
            >
              <AnimatedText langKey={lang} delay={0.3}>
                {t.about.cta}
              </AnimatedText>{" "}
              <span>→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {t.about.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${colors[i]}`,
                  boxShadow: "var(--card-shadow)",
                  transition: "background 0.35s, border 0.35s",
                }}
              >
                <span
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: colors[i],
                  }}
                >
                  {s.value}
                </span>
                <AnimatedText
                  langKey={lang}
                  delay={i * 0.08}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-sub)",
                  }}
                >
                  {s.label}
                </AnimatedText>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
