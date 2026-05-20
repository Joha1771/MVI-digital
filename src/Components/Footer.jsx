import { motion } from "framer-motion";
import { PhoneIcon, MailIcon, MapPinIcon } from "./Icons";
import { useTranslation } from "../i18n/useTranslation";
import { AnimatedText } from "../i18n/AnimatedText";
import itparkLogo from "../assets/itpark-logo.jpg";

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#how", key: "how" },
  { href: "#contact", key: "contact" },
];

export default function Footer() {
  const { t, lang } = useTranslation();

  const contacts = [
    {
      icon: <PhoneIcon size={14} color="currentColor" />,
      label: "+998 95 980 66 00",
      href: "tel:+998959806600",
    },
    {
      icon: <MailIcon size={14} color="currentColor" />,
      label: "mvidigit@gmail.com",
      href: "mailto:mvidigit@gmail.com",
    },
    {
      icon: <MapPinIcon size={14} color="currentColor" />,
      label: "Tashkent, Uzbekistan",
      href: "#",
    },
  ];

  return (
    <footer
      style={{
        background: "#1B4332",
        borderTop: "1px solid rgba(26,158,92,0.2)",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/logo-light.svg"
              alt="MVI Digital"
              style={{
                height: "36px",
                width: "auto",
                marginBottom: "1rem",
                display: "block",
              }}
            />
            <AnimatedText
              langKey={lang}
              delay={0}
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                fontWeight: 500,
                color: "rgba(232,245,238,0.7)",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              {t.footer.desc}
            </AnimatedText>

            {/* IT Park Resident badge */}
            <a
              href="https://www.it-park.uz/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(232,245,238,0.12)",
                textDecoration: "none",
              }}
            >
              <img
                src={itparkLogo}
                alt="IT Park"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  objectFit: "contain",
                  background: "white",
                  padding: "4px",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#e8f5ee",
                    lineHeight: 1.2,
                  }}
                >
                  IT Park
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(232,245,238,0.5)",
                    marginBottom: "3px",
                  }}
                >
                  Uzbekistan
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#1A9E5C",
                    background: "rgba(26,158,92,0.15)",
                    border: "1px solid rgba(26,158,92,0.3)",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  РЕЗИДЕНТ
                </div>
              </div>
            </a>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(232,245,238,0.45)",
                marginBottom: "1.25rem",
              }}
            >
              <AnimatedText langKey={lang} delay={0}>
                {t.footer.nav}
              </AnimatedText>
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {navLinks.map((l, i) => (
                <a
                  key={l.key}
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "rgba(232,245,238,0.7)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(232,245,238,0.7)")
                  }
                >
                  <AnimatedText langKey={lang} delay={i * 0.07}>
                    {t.nav[l.key]}
                  </AnimatedText>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(232,245,238,0.45)",
                marginBottom: "1.25rem",
              }}
            >
              <AnimatedText langKey={lang} delay={0}>
                {t.footer.contacts}
              </AnimatedText>
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "rgba(232,245,238,0.7)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(232,245,238,0.7)")
                  }
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(232,245,238,0.1)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(232,245,238,0.45)",
            }}
          >
            © {new Date().getFullYear()} MVI Digital.{" "}
            <AnimatedText langKey={lang} delay={0}>
              {t.footer.rights}
            </AnimatedText>
          </p>
          <AnimatedText
            langKey={lang}
            delay={0.1}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(232,245,238,0.45)",
            }}
          >
            {t.footer.resident}
          </AnimatedText>
        </div>
      </div>
    </footer>
  );
}
