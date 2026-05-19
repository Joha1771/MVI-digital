import { useState, useCallback, useEffect } from "react";
import ru from "./ru.js";
import uz from "./uz.js";
import en from "./en.js";

const locales = { ru, uz, en };
const STORAGE_KEY = "mvi_lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && locales[saved]) return saved;
    const browser = navigator.language?.slice(0, 2);
    if (locales[browser]) return browser;
  } catch {}
  return "ru";
}

let _lang = getInitialLang();
const _listeners = new Set();

export function useTranslation() {
  const [lang, setLangState] = useState(_lang);

  const setLang = useCallback((l) => {
    if (!locales[l]) return;
    _lang = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    _listeners.forEach((fn) => fn(l));
  }, []);

  useEffect(() => {
    const fn = (l) => setLangState(l);
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  }, []);

  return { t: locales[lang], lang, setLang, langs: ["ru", "uz", "en"] };
}
