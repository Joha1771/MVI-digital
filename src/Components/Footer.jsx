import { motion } from "framer-motion";
import { PhoneIcon, GlobeIcon, MapPinIcon } from "./Icons";

const links = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#how" },
  { label: "Контакты", href: "#contact" },
];

const contacts = [
  {
    icon: <PhoneIcon size={14} color="currentColor" />,
    label: "+998 95 980 66 00",
    href: "tel:+998959806600",
  },
  {
    icon: <GlobeIcon size={14} color="currentColor" />,
    label: "mvi.com",
    href: "https://mvi.com",
  },
  {
    icon: <MapPinIcon size={14} color="currentColor" />,
    label: "Ташкент, Узбекистан",
    href: "#",
  },
];

export default function Footer({ theme }) {
  const logo = theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 2rem",
        transition: "background 0.35s",
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={logo}
              alt="MVI Digital"
              style={{
                height: "35px",
                width: "120px",
                objectFit: "contain",
                marginBottom: "1rem",
                transition: "opacity 0.35s",
              }}
            />
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                fontWeight: 500,
                color: "var(--text-sub)",
              }}
            >
              Разработка сайтов и приложений для бизнеса. Резидент IT Park
              Uzbekistan.
            </p>
          </motion.div>

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
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              НАВИГАЦИЯ
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-sub)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-sub)")
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

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
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              КОНТАКТЫ
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
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-sub)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-sub)")
                  }
                >
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
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
              color: "var(--text-muted)",
            }}
          >
            © {new Date().getFullYear()} MVI Digital. Все права защищены.
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--text-muted)",
            }}
          >
            Resident IT Park Uzbekistan
          </p>
        </div>
      </div>
    </footer>
  );
}
