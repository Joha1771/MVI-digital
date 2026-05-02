import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Сайты и лендинги",
    desc: "Разрабатываем современные сайты с высокой конверсией. Адаптивный дизайн под все устройства и платформы.",
    tags: ["Landing Page", "Corporate Site", "E-commerce", "SEO"],
  },
  {
    number: "02",
    title: "Веб-приложения",
    desc: "Создаём сложные веб-приложения с удобным интерфейсом. React, Next.js, TypeScript — под любые задачи.",
    tags: ["React", "Next.js", "TypeScript", "REST API"],
  },
  {
    number: "03",
    title: "Мобильные приложения",
    desc: "Мобильные приложения для iOS и Android. Нативная производительность и современный дизайн.",
    tags: ["iOS", "Android", "React Native", "UI/UX"],
  },
  {
    number: "04",
    title: "Финтех-решения",
    desc: "Платёжные интеграции, финансовые дашборды и безопасные транзакционные системы под ключ.",
    tags: ["Payments", "Dashboard", "Security", "API"],
  },
  {
    number: "05",
    title: "Поддержка и доработка",
    desc: "Техническая поддержка, обновления функционала и оптимизация производительности существующих проектов.",
    tags: ["Support", "Optimization", "Maintenance", "Updates"],
  },
];

function ServiceCard({ service, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const isEven = index % 2 === 0;

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
            background: isEven ? "#0a0a0a" : "#f5f4f0",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            border: isEven
              ? "1px solid rgba(245,244,240,0.08)"
              : "1px solid rgba(10,10,10,0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = isEven
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.15)";
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
                color: isEven ? "rgba(245,244,240,0.3)" : "rgba(10,10,10,0.3)",
                fontFamily: "monospace",
              }}
            >
              {service.number}
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: isEven
                  ? "rgba(245,244,240,0.1)"
                  : "rgba(10,10,10,0.1)",
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
              color: isEven ? "#f5f4f0" : "#0a0a0a",
              marginBottom: "1rem",
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              fontWeight: 500,
              color: isEven ? "rgba(245,244,240,0.5)" : "rgba(10,10,10,0.5)",
              marginBottom: "1.5rem",
              maxWidth: "28rem",
            }}
          >
            {service.desc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.375rem 0.875rem",
                  borderRadius: "50px",
                  border: `1px solid ${isEven ? "rgba(245,244,240,0.15)" : "rgba(10,10,10,0.15)"}`,
                  color: isEven
                    ? "rgba(245,244,240,0.6)"
                    : "rgba(10,10,10,0.6)",
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "48rem", marginBottom: "5rem" }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            УСЛУГИ
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            Что мы делаем
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ position: "relative" }}>
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              total={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
