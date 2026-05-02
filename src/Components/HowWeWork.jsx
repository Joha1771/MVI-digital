import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Обсуждаем задачу",
    desc: "Выслушиваем ваши цели, анализируем задачу и предлагаем оптимальное решение.",
  },
  {
    n: "02",
    title: "Делаем решение",
    desc: "Проектируем архитектуру, разрабатываем дизайн и согласовываем с вами.",
  },
  {
    n: "03",
    title: "Разрабатываем",
    desc: "Пишем чистый код, тестируем на всех устройствах и держим вас в курсе.",
  },
  {
    n: "04",
    title: "Запускаем",
    desc: "Деплоим проект, настраиваем домен и проводим финальное тестирование.",
  },
  {
    n: "05",
    title: "Поддерживаем",
    desc: "Обеспечиваем техническую поддержку и обновления после запуска.",
  },
];

export default function HowWeWork() {
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
            КАК МЫ РАБОТАЕМ
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            Простой процесс —<br />
            <span style={{ color: "var(--text-muted)" }}>
              понятный результат
            </span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "flex-start",
                padding: "2rem 0",
                borderBottom:
                  i < steps.length - 1 ? "1px solid var(--border)" : "none",
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
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--accent)",
                  boxShadow: "var(--card-shadow)",
                  transition: "background 0.35s, border 0.35s",
                }}
              >
                {s.n}
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--text-sub)",
                    fontWeight: 500,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
