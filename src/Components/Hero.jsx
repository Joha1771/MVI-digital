import { motion } from "framer-motion";
import Silk from "./Silk";
import { PhoneIcon, ArrowRightIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-[250px] pb-[280px] flex items-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1}
          color="#3a3a3a"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.97) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-8 md:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontSize: "clamp(40px,6vw,72px)",
              color: "#f5f4f0",
              letterSpacing: "-0.02em",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
            }}
          >
            Разработка сайтов
            <br />и приложений
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: "rgba(245,244,240,0.55)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              maxWidth: "36rem",
              marginBottom: "2.5rem",
              fontWeight: 500,
            }}
          >
            MVI Digital создаёт цифровые решения под ключ — от лендингов до
            финтех-платформ. Быстро и с фокусом на результат.
          </motion.p>

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
                background: "var(--btn-primary)",
                color: "var(--btn-primary-text)",
                transition: "background 0.35s, color 0.35s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Заказать проект
              <ArrowRightIcon size={15} color="currentColor" />
            </a>

            <a
              href="#services"
              style={{
                padding: "14px 28px",
                borderRadius: "50px",
                fontWeight: 500,
                fontSize: "0.875rem",
                border: "1px solid rgba(245,244,240,0.2)",
                color: "rgba(245,244,240,0.65)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(245,244,240,0.4)";
                e.target.style.color = "#f5f4f0";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(245,244,240,0.2)";
                e.target.style.color = "rgba(245,244,240,0.65)";
              }}
            >
              Наши услуги
            </a>

            <a
              href="tel:+998959806600"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "rgba(245,244,240,0.3)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,244,240,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,244,240,0.3)")
              }
            >
              <PhoneIcon size={14} color="currentColor" />
              +998 95 980 66 00
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              display: "flex",
              gap: "3rem",
              borderTop: "1px solid rgba(245,244,240,0.1)",
              paddingTop: "2rem",
            }}
          >
            {[
              ["50+", "проектов"],
              ["3+", "года опыта"],
              ["100%", "довольных"],
            ].map(([v, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 800,
                    color: "#f5f4f0",
                    marginBottom: "0.25rem",
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "rgba(245,244,240,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll */}
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
              "linear-gradient(to bottom, rgba(245,244,240,0.4), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "rgba(245,244,240,0.25)",
          }}
        >
          SCROLL
        </span>
      </motion.div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}
