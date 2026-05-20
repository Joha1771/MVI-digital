import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";
import { ArrowRightIcon } from "./Icons";

const accents = ["#1D74BB", "#1A9E5C", "#5BC4F5", "#1D74BB", "#1B4332"];

// Маппинг услуги → value для select в форме
const serviceValues = ["site", "app", "app", "fintech", "other"];

function ServiceCard({ service, index, total, accent, lang, serviceValue }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const isDark = index % 2 === 0;

  const handleOrder = () => {
    // Скроллим к форме
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    // Предзаполняем select через кастомное событие
    setTimeout(() => {
      const event = new CustomEvent("prefill-service", {
        detail: serviceValue,
      });
      window.dispatchEvent(event);
    }, 600);
  };

  const btnLabel = {
    ru: "Заказать",
    uz: "Buyurtma",
    en: "Order",
  };

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
          {/* Header */}
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

          {/* Title */}
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

          {/* Desc */}
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

          {/* Tags + Button row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
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

            {/* CTA кнопка */}
            <button
              onClick={handleOrder}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                background: accent,
                color: isDark ? "#e8f5ee" : "#ffffff",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: `0 4px 16px ${accent}40`,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = `0 6px 24px ${accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = `0 4px 16px ${accent}40`;
              }}
            >
              {btnLabel[lang] || btnLabel.ru}
              <ArrowRightIcon size={13} color="currentColor" />
            </button>
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
              serviceValue={serviceValues[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
