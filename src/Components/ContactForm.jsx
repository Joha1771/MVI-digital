import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PhoneIcon, MailIcon, CheckIcon, ArrowRightIcon } from "./Icons";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const { t, lang } = useTranslation();
  const e = t.contact.errors;

  const schema = Yup.object({
    name: Yup.string().min(2, e.nameMin).required(e.nameRequired),
    phone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{9,15}$/, e.phoneInvalid)
      .required(e.phoneRequired),
    service: Yup.string().required(e.serviceRequired),
  });

  const f = useFormik({
    initialValues: { name: "", phone: "", service: "" },
    validationSchema: schema,
    onSubmit: () => setDone(true),
    enableReinitialize: true,
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
          <AnimatedText
            langKey={lang}
            delay={0}
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "var(--accent)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            {t.contact.tag}
          </AnimatedText>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "0.75rem",
            }}
          >
            <AnimatedText langKey={lang} delay={0.07}>
              {t.contact.title}
            </AnimatedText>
          </h2>
          <AnimatedBlock
            langKey={lang}
            delay={0.13}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--text-sub)",
            }}
          >
            {t.contact.desc}
          </AnimatedBlock>
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
                  <AnimatedText langKey={lang} delay={0.1}>
                    {t.contact.name}
                  </AnimatedText>
                </label>
                <input
                  type="text"
                  name="name"
                  value={f.values.name}
                  onChange={f.handleChange}
                  placeholder={t.contact.namePlaceholder}
                  style={inputStyle("name")}
                  onFocus={(e) => (e.target.style.border = "1px solid #1A9E5C")}
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
                  <AnimatedText langKey={lang} delay={0.15}>
                    {t.contact.phone}
                  </AnimatedText>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={f.values.phone}
                  onChange={f.handleChange}
                  placeholder={t.contact.phonePlaceholder}
                  style={inputStyle("phone")}
                  onFocus={(e) => (e.target.style.border = "1px solid #1A9E5C")}
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
                  <AnimatedText langKey={lang} delay={0.2}>
                    {t.contact.service}
                  </AnimatedText>
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
                    {t.contact.servicePlaceholder}
                  </option>
                  {t.contact.serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
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
                  background: "#1A9E5C",
                  color: "#ffffff",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(26,158,92,0.3)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(26,158,92,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(26,158,92,0.3)";
                }}
              >
                <AnimatedText langKey={lang} delay={0.25}>
                  {t.contact.submit}
                </AnimatedText>
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
                  background: "rgba(26,158,92,0.1)",
                  border: "1px solid rgba(26,158,92,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <CheckIcon size={28} color="#1A9E5C" />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                }}
              >
                <AnimatedText langKey={lang} delay={0}>
                  {t.contact.successTitle}
                </AnimatedText>
              </h3>
              <AnimatedBlock
                langKey={lang}
                delay={0.1}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-sub)",
                  fontWeight: 500,
                }}
              >
                {t.contact.successDesc}
              </AnimatedBlock>
            </motion.div>
          )}
        </motion.div>

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
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-sub)")
            }
          >
            <PhoneIcon size={14} color="currentColor" /> +998 95 980 66 00
          </a>
          <a
            href="mailto:mvidigit@gmail.com"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-sub)",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-sub)")
            }
          >
            <MailIcon size={14} color="currentColor" /> mvidigit@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
