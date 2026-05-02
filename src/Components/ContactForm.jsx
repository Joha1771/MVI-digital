import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PhoneIcon, GlobeIcon, CheckIcon, ArrowRightIcon } from "./Icons";

const schema = Yup.object({
  name: Yup.string().min(2, "Минимум 2 символа").required("Введите имя"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-()]{9,15}$/, "Некорректный номер")
    .required("Введите телефон"),
  service: Yup.string().required("Выберите услугу"),
});

export default function ContactForm() {
  const [done, setDone] = useState(false);

  const f = useFormik({
    initialValues: { name: "", phone: "", service: "" },
    validationSchema: schema,
    onSubmit: () => setDone(true),
  });

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    fontWeight: 500,
    outline: "none",
    background: "var(--bg)",
    color: "var(--text)",
    border:
      f.touched[field] && f.errors[field]
        ? "1px solid #ef4444"
        : "1px solid var(--border-md)",
    transition: "border 0.2s, background 0.35s, color 0.35s",
  });

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-alt)",
        padding: "8rem 2rem",
        transition: "background 0.35s",
      }}
    >
      <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
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
            КОНТАКТЫ
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "0.75rem",
            }}
          >
            Оставить заявку
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--text-sub)",
            }}
          >
            Свяжемся в течение 24 часов
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            boxShadow: "var(--card-shadow)",
            transition: "all 0.35s",
          }}
        >
          {!done ? (
            <form
              onSubmit={f.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Имя */}
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  ИМЯ
                </label>
                <input
                  type="text"
                  name="name"
                  value={f.values.name}
                  onChange={f.handleChange}
                  placeholder="Ваше имя"
                  style={inputStyle("name")}
                  onFocus={(e) =>
                    (e.target.style.border = "1px solid var(--border-md)")
                  }
                  onBlur={(e) => {
                    f.handleBlur(e);
                    e.target.style.border = f.errors.name
                      ? "1px solid #ef4444"
                      : "1px solid var(--border-md)";
                  }}
                />
                {f.touched.name && f.errors.name && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      marginTop: "0.375rem",
                      fontWeight: 500,
                    }}
                  >
                    {f.errors.name}
                  </p>
                )}
              </div>

              {/* Телефон */}
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  ТЕЛЕФОН
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={f.values.phone}
                  onChange={f.handleChange}
                  placeholder="+998 xx xxx xx xx"
                  style={inputStyle("phone")}
                  onFocus={(e) =>
                    (e.target.style.border = "1px solid var(--border-md)")
                  }
                  onBlur={(e) => {
                    f.handleBlur(e);
                    e.target.style.border = f.errors.phone
                      ? "1px solid #ef4444"
                      : "1px solid var(--border-md)";
                  }}
                />
                {f.touched.phone && f.errors.phone && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      marginTop: "0.375rem",
                      fontWeight: 500,
                    }}
                  >
                    {f.errors.phone}
                  </p>
                )}
              </div>

              {/* Услуга */}
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  ЧТО НУЖНО
                </label>
                <select
                  name="service"
                  value={f.values.service}
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  style={{
                    ...inputStyle("service"),
                    cursor: "pointer",
                    color: f.values.service
                      ? "var(--text)"
                      : "var(--text-muted)",
                  }}
                >
                  <option value="" disabled>
                    Выберите услугу
                  </option>
                  <option value="site">Сайт</option>
                  <option value="app">Приложение</option>
                  <option value="fintech">Финтех-решение</option>
                  <option value="other">Другое</option>
                </select>
                {f.touched.service && f.errors.service && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      marginTop: "0.375rem",
                      fontWeight: 500,
                    }}
                  >
                    {f.errors.service}
                  </p>
                )}
              </div>

              {/* Кнопка — как остальные, не зелёная */}
              <button
                type="submit"
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  border: "none",
                  marginTop: "0.5rem",
                  background: "var(--btn-primary)",
                  color: "var(--btn-primary-text)",
                  transition: "background 0.35s, color 0.35s, transform 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Отправить заявку
                <ArrowRightIcon size={15} color="currentColor" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "2.5rem 0" }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <CheckIcon size={28} color="var(--text)" />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                }}
              >
                Заявка отправлена!
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-sub)",
                  fontWeight: 500,
                }}
              >
                Свяжемся с вами в течение 24 часов
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Контакты */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="tel:+998959806600"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-sub)",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-sub)")
            }
          >
            <PhoneIcon size={14} color="currentColor" />
            +998 95 980 66 00
          </a>
          <a
            href="https://mvi.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-sub)",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-sub)")
            }
          >
            <GlobeIcon size={14} color="currentColor" />
            mvi.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
