import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

const accents = ["#1D74BB", "#1A9E5C", "#5BC4F5", "#1D74BB", "#1B4332"];

function ServiceCard({ service, index, total, accent, lang }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const isDark = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: `${80 + index * 20}px`,
        zIndex: index + 1,
        marginBottom: index < total - 1 ? "2rem" : 0,
      }}
    >
      <motion.div style={{ y, opacity }} className="max-w-3xl mx-auto">
        <div
          style={{
            background: isDark ? "#1B4332" : "#f0f7f4",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            border: isDark
              ? "1px solid rgba(26,158,92,0.2)"
              : "1px solid rgba(27,67,50,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = isDark
              ? "0 20px 60px rgba(0,0,0,0.4)"
              : "0 20px 60px rgba(27,67,50,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: accent,
                fontFamily: "monospace",
              }}
            >
              {service.number}
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: isDark
                  ? "rgba(232,245,238,0.1)"
                  : "rgba(27,67,50,0.1)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accent,
              }}
            />
          </div>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: isDark ? "#e8f5ee" : "#0d1f18",
              marginBottom: "1rem",
            }}
          >
            <AnimatedText langKey={lang} delay={0.05}>
              {service.title}
            </AnimatedText>
          </h3>
          <AnimatedBlock
            langKey={lang}
            delay={0.1}
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              fontWeight: 500,
              color: isDark ? "rgba(232,245,238,0.55)" : "rgba(13,31,24,0.55)",
              marginBottom: "1.5rem",
              maxWidth: "28rem",
            }}
          >
            {service.desc}
          </AnimatedBlock>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {service.tags.map((tag, ti) => (
              <AnimatedText
                key={tag}
                langKey={lang}
                delay={0.15 + ti * 0.04}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.375rem 0.875rem",
                  borderRadius: "50px",
                  border: `1px solid ${accent}40`,
                  color: accent,
                  letterSpacing: "0.02em",
                  background: `${accent}10`,
                }}
              >
                {tag}
              </AnimatedText>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const { t, lang } = useTranslation();

  return (
    <section
      id="services"
      style={{
        background: "var(--bg)",
        padding: "8rem 2rem",
        transition: "background 0.35s",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "48rem", marginBottom: "5rem" }}
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
            {t.services.tag}
          </AnimatedText>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            <AnimatedText langKey={lang} delay={0.08}>
              {t.services.title}
            </AnimatedText>
          </h2>
        </motion.div>
        <div style={{ position: "relative" }}>
          {t.services.items.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              total={t.services.items.length}
              accent={accents[i]}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
