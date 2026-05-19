import { motion } from "framer-motion";
import Silk from "./Silk";
import { PhoneIcon, ArrowRightIcon } from "./Icons";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

export default function Hero() {
  const { t, lang } = useTranslation();

  return (
    <section
      id="hero"
      className="relative pt-[140px] pb-[160px] flex items-center overflow-hidden"
      style={{ background: "#0c1f17" }}
    >
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1}
          color="#1B4332"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,31,23,0.15) 0%, rgba(12,31,23,0.5) 50%, rgba(12,31,23,0.97) 100%)",
        }}
      />
      <div
        className="absolute z-1"
        style={{
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,158,92,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute z-1"
        style={{
          top: "40%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,158,92,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 w-full px-8 md:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "50px",
              background: "rgba(26,158,92,0.12)",
              border: "1px solid rgba(26,158,92,0.25)",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1A9E5C",
                display: "inline-block",
              }}
            />
            <AnimatedText
              langKey={lang}
              delay={0}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#1A9E5C",
                letterSpacing: "0.08em",
              }}
            >
              {t.hero.badge}
            </AnimatedText>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontSize: "clamp(40px,6vw,72px)",
              letterSpacing: "-0.02em",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
            }}
          >
            <AnimatedText
              langKey={lang}
              delay={0.05}
              style={{ color: "#e8f5ee", display: "block" }}
            >
              {t.hero.title1}
            </AnimatedText>
            <AnimatedText
              langKey={lang}
              delay={0.1}
              style={{ color: "#e8f5ee", display: "block" }}
            >
              {t.hero.title2}
            </AnimatedText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <AnimatedBlock
              langKey={lang}
              delay={0.15}
              style={{
                color: "rgba(232,245,238,0.55)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                maxWidth: "36rem",
                fontWeight: 500,
              }}
            >
              {t.hero.desc}
            </AnimatedBlock>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "5rem",
            }}
          >
            <a
              href="#contact"
              style={{
                padding: "14px 28px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.875rem",
                background: "#1A9E5C",
                color: "#ffffff",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 20px rgba(26,158,92,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow =
                  "0 6px 28px rgba(26,158,92,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(26,158,92,0.35)";
              }}
            >
              <AnimatedText langKey={lang} delay={0.2}>
                {t.hero.cta}
              </AnimatedText>
              <ArrowRightIcon size={15} color="currentColor" />
            </a>
            <a
              href="#services"
              style={{
                padding: "14px 28px",
                borderRadius: "50px",
                fontWeight: 500,
                fontSize: "0.875rem",
                border: "1px solid rgba(26,158,92,0.35)",
                color: "rgba(232,245,238,0.7)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1A9E5C";
                e.currentTarget.style.color = "#e8f5ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,158,92,0.35)";
                e.currentTarget.style.color = "rgba(232,245,238,0.7)";
              }}
            >
              <AnimatedText langKey={lang} delay={0.25}>
                {t.hero.services}
              </AnimatedText>
            </a>
            <a
              href="tel:+998959806600"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "rgba(232,245,238,0.35)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(232,245,238,0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(232,245,238,0.35)")
              }
            >
              <PhoneIcon size={14} color="currentColor" /> +998 95 980 66 00
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              display: "flex",
              gap: "3rem",
              borderTop: "1px solid rgba(26,158,92,0.2)",
              paddingTop: "2rem",
            }}
          >
            {t.hero.stats.map(({ value, label }, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 800,
                    color: "#1A9E5C",
                    marginBottom: "0.25rem",
                  }}
                >
                  {value}
                </div>
                <AnimatedText
                  langKey={lang}
                  delay={0.3 + i * 0.06}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "rgba(232,245,238,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {label}
                </AnimatedText>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "4rem",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(26,158,92,0.6), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "rgba(26,158,92,0.4)",
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
