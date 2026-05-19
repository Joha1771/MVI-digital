import { motion, AnimatePresence } from "framer-motion";

/**
 * Оборачивает текст — при смене lang (key) он:
 * 1. Выезжает вверх и исчезает
 * 2. Появляется снизу с задержкой delay (stagger)
 */
export function AnimatedText({ children, langKey, delay = 0, as: Tag = "span", style, className }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={langKey + String(children).slice(0, 12)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, delay, ease: "easeOut" }}
        style={{ display: "inline-block", ...style }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

/**
 * Блочная версия (для параграфов, заголовков и т.д.)
 */
export function AnimatedBlock({ children, langKey, delay = 0, style, className }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={langKey + delay}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, delay, ease: "easeOut" }}
        style={style}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
