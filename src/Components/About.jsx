import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { value: "50+", label: "Проектов выполнено" },
    { value: "3+", label: "Года на рынке" },
    { value: "100%", label: "Клиентов довольны" },
  ];
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
              О КОМПАНИИ
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              Молодая команда.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Сильные решения.
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-sub)",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              MVI Digital — резидент IT Park Uzbekistan. Мы занимаемся
              разработкой сайтов и приложений, создавая цифровые решения под
              задачи бизнеса.
            </p>
            <p
              style={{
                color: "var(--text-sub)",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              Работаем быстро, прозрачно и результативно. Каждый проект —
              индивидуальный подход и фокус на реальных бизнес-целях клиента.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--text)",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "0.75rem")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
            >
              Обсудить проект <span>→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {stats.map((s, i) => (
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
                  boxShadow: "var(--card-shadow)",
                  transition:
                    "background 0.35s, border 0.35s, box-shadow 0.35s",
                }}
              >
                <span
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-sub)",
                  }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
