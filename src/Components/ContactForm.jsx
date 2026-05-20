import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createClient } from "@supabase/supabase-js";
import { PhoneIcon, MailIcon, CheckIcon, ArrowRightIcon } from "./Icons";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText, AnimatedBlock } from "../i18n/AnimatedText";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const sendTelegram = async (name, phone, service) => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const text = `🔔 *Новая заявка с сайта!*\n\n👤 *Имя:* ${name}\n📱 *Телефон:* ${phone}\n💼 *Услуга:* ${service}\n🕐 *Время:* ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
};

// Кастомный Dropdown
function CustomSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  prefilled,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={onBlur}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "12px",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: 500,
          outline: "none",
          cursor: "pointer",
          background: prefilled ? "rgba(26,158,92,0.06)" : "var(--bg)",
          color: selected ? "var(--text)" : "var(--text-muted)",
          border: hasError
            ? "1px solid #ef4444"
            : prefilled
              ? "1px solid rgba(26,158,92,0.5)"
              : open
                ? "1px solid #1A9E5C"
                : "1px solid var(--border-md)",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          textAlign: "left",
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path
            d="M2 5l5 5 5-5"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 100,
              background: "var(--card-bg)",
              border: "1px solid var(--border-md)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            {options.map((o, i) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background:
                    value === o.value ? "rgba(26,158,92,0.08)" : "transparent",
                  color: value === o.value ? "#1A9E5C" : "var(--text)",
                  borderBottom:
                    i < options.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  if (value !== o.value)
                    e.currentTarget.style.background = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  if (value !== o.value)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {value === o.value ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l4 4 6-6"
                      stroke="#1A9E5C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span style={{ width: 14 }} />
                )}
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [sendError, setSendError] = useState("");
  const { t, lang } = useTranslation();
  const e = t.contact.errors;

  const serviceLabels = {
    site: { ru: "Сайт", uz: "Sayt", en: "Website" },
    app: { ru: "Приложение", uz: "Ilova", en: "Application" },
    fintech: {
      ru: "Финтех-решение",
      uz: "Fintech yechimi",
      en: "Fintech solution",
    },
    other: { ru: "Другое", uz: "Boshqa", en: "Other" },
  };

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
    onSubmit: async (values) => {
      setSending(true);
      setSendError("");
      try {
        // 1. Сохраняем в Supabase
        const { error } = await supabase.from("leads").insert({
          name: values.name,
          phone: values.phone,
          service: serviceLabels[values.service]?.[lang] || values.service,
        });
        if (error) throw error;

        // 2. Отправляем в Telegram
        await sendTelegram(
          values.name,
          values.phone,
          serviceLabels[values.service]?.[lang] || values.service,
        );

        setDone(true);
      } catch (err) {
        setSendError("Ошибка отправки. Попробуйте ещё раз.");
        console.error(err);
      } finally {
        setSending(false);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const handler = (ev) => {
      f.setFieldValue("service", ev.detail);
      setPrefilled(true);
      setTimeout(() => setPrefilled(false), 4000);
    };
    window.addEventListener("prefill-service", handler);
    return () => window.removeEventListener("prefill-service", handler);
  }, []);

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

  const hintLabels = {
    ru: "Услуга выбрана из каталога",
    uz: "Xizmat katalogdan tanlandi",
    en: "Service selected from catalog",
  };

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
              color: "var(--accent2)",
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: "var(--text-muted)",
                    }}
                  >
                    <AnimatedText langKey={lang} delay={0.2}>
                      {t.contact.service}
                    </AnimatedText>
                  </label>
                  <AnimatePresence>
                    {prefilled && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "#1A9E5C",
                          background: "rgba(26,158,92,0.08)",
                          border: "1px solid rgba(26,158,92,0.2)",
                          padding: "2px 8px",
                          borderRadius: "20px",
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M1.5 5l2.5 2.5 4.5-4.5"
                            stroke="#1A9E5C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {hintLabels[lang] || hintLabels.ru}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <CustomSelect
                  options={t.contact.serviceOptions}
                  value={f.values.service}
                  onChange={(val) => f.setFieldValue("service", val)}
                  onBlur={() => f.setFieldTouched("service", true)}
                  placeholder={t.contact.servicePlaceholder}
                  hasError={f.touched.service && f.errors.service}
                  prefilled={prefilled && !!f.values.service}
                />
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

              {sendError && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {sendError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: sending ? "not-allowed" : "pointer",
                  border: "none",
                  marginTop: "0.5rem",
                  background: "#1A9E5C",
                  color: "#ffffff",
                  transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(26,158,92,0.3)",
                  fontFamily: "inherit",
                  opacity: sending ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(26,158,92,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(26,158,92,0.3)";
                }}
              >
                {sending ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <AnimatedText langKey={lang} delay={0.25}>
                      {t.contact.submit}
                    </AnimatedText>
                    <ArrowRightIcon size={15} color="currentColor" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "2.5rem 0" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
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
              </motion.div>
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
                  marginBottom: "1rem",
                }}
              >
                {t.contact.successDesc}
              </AnimatedBlock>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {
                  {
                    ru: "Уведомление отправлено нашей команде ✓",
                    uz: "Jamoamizga xabar yuborildi ✓",
                    en: "Notification sent to our team ✓",
                  }[lang]
                }
              </div>
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
              (e.currentTarget.style.color = "var(--accent2)")
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
              (e.currentTarget.style.color = "var(--accent2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-sub)")
            }
          >
            <MailIcon size={14} color="currentColor" /> mvidigit@gmail.com
          </a>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
