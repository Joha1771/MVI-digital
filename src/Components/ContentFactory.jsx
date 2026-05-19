import { useState, useRef } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", emoji: "📸", color: "#E1306C" },
  { id: "telegram", label: "Telegram", emoji: "✈️", color: "#2AABEE" },
  { id: "linkedin", label: "LinkedIn", emoji: "💼", color: "#0A66C2" },
  { id: "twitter", label: "Twitter/X", emoji: "🐦", color: "#1DA1F2" },
  { id: "vk", label: "VK", emoji: "💙", color: "#4C75A3" },
];

const TONES = ["Экспертный", "Дружелюбный", "Провокационный", "Вдохновляющий", "Продающий"];
const FORMATS = ["Обычный пост", "Карусель (тезисы)", "Сторителлинг", "Список советов", "Вопрос-ответ"];
const COUNTS = [1, 3, 5];

export default function ContentFactory() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("Экспертный");
  const [format, setFormat] = useState("Обычный пост");
  const [count, setCount] = useState(3);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const selectedPlatform = PLATFORMS.find(p => p.id === platform);

  const generate = async () => {
    if (!topic.trim()) { setError("Введите тему поста"); return; }
    setError("");
    setLoading(true);
    setPosts([]);
    setExpanded(null);

    const platformLabel = selectedPlatform?.label || platform;

    const prompt = `Ты — профессиональный SMM-копирайтер. Создай ${count} уникальных поста для ${platformLabel}.

Ниша: ${niche || "не указана"}
Тема: ${topic}
Тон: ${tone}
Формат: ${format}

Требования:
- Каждый пост уникален по структуре
- Добавь релевантные эмодзи
- Включи призыв к действию (CTA)
- Если "Карусель" — тезисы с заголовком каждого слайда
- Если "Список советов" — нумерованный список
- 5–10 хэштегов в конце каждого поста

Ответь ТОЛЬКО в формате JSON (без markdown, без лишнего текста):
{
  "posts": [
    {
      "title": "короткий заголовок",
      "body": "текст поста",
      "hashtags": ["#тег1", "#тег2"],
      "cta": "призыв к действию"
    }
  ]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPosts(parsed.posts || []);
      setExpanded(0);
    } catch (e) {
      setError("Ошибка генерации. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const copyPost = (post, idx) => {
    const text = `${post.body}\n\n${post.hashtags.join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f0d",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      color: "#e8f5ee",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f2a1e 0%, #1B4332 50%, #0f2a1e 100%)",
        borderBottom: "1px solid rgba(26,158,92,0.2)",
        padding: "24px 28px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #1A9E5C, #1D74BB)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px",
          }}>⚡</div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.01em", margin: 0 }}>
              MVI <span style={{ color: "#1A9E5C" }}>Контент-завод</span>
            </h1>
            <p style={{ fontSize: "11px", color: "rgba(232,245,238,0.4)", margin: 0, fontWeight: 500 }}>
              AI генерация постов для соцсетей
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "column" }}>
        {/* Form */}
        <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(26,158,92,0.1)" }}>

          {/* Platform */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "8px" }}>ПЛАТФОРМА</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                  padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  border: platform === p.id ? `1px solid ${p.color}` : "1px solid rgba(255,255,255,0.08)",
                  background: platform === p.id ? `${p.color}20` : "rgba(255,255,255,0.04)",
                  color: platform === p.id ? p.color : "rgba(232,245,238,0.5)",
                  transition: "all 0.15s",
                }}>
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic + Niche */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
            <div>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "6px" }}>ТЕМА *</label>
              <input
                value={topic} onChange={e => { setTopic(e.target.value); setError(""); }}
                placeholder="Напр: 5 ошибок при запуске сайта"
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: "10px", fontSize: "13px",
                  background: "rgba(255,255,255,0.05)", border: error ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                  color: "#e8f5ee", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#1A9E5C"}
                onBlur={e => e.target.style.borderColor = error ? "#ef4444" : "rgba(255,255,255,0.1)"}
              />
            </div>
            <div>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "6px" }}>НИША</label>
              <input
                value={niche} onChange={e => setNiche(e.target.value)}
                placeholder="Напр: digital-агентство, IT"
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: "10px", fontSize: "13px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e8f5ee", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#1A9E5C"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
          </div>

          {/* Tone + Format + Count */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "10px", alignItems: "end" }}>
            <div>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "6px" }}>ТОН</label>
              <select value={tone} onChange={e => setTone(e.target.value)} style={{
                width: "100%", padding: "10px 12px", borderRadius: "10px", fontSize: "13px",
                background: "#1a2e24", border: "1px solid rgba(255,255,255,0.1)", color: "#e8f5ee",
                outline: "none", fontFamily: "inherit", cursor: "pointer",
              }}>
                {TONES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "6px" }}>ФОРМАТ</label>
              <select value={format} onChange={e => setFormat(e.target.value)} style={{
                width: "100%", padding: "10px 12px", borderRadius: "10px", fontSize: "13px",
                background: "#1a2e24", border: "1px solid rgba(255,255,255,0.1)", color: "#e8f5ee",
                outline: "none", fontFamily: "inherit", cursor: "pointer",
              }}>
                {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.4)", display: "block", marginBottom: "6px" }}>КОЛ-ВО</label>
              <div style={{ display: "flex", gap: "4px" }}>
                {COUNTS.map(c => (
                  <button key={c} onClick={() => setCount(c)} style={{
                    width: "38px", height: "40px", borderRadius: "10px", fontSize: "13px", fontWeight: 700,
                    border: count === c ? "1px solid #1A9E5C" : "1px solid rgba(255,255,255,0.1)",
                    background: count === c ? "rgba(26,158,92,0.2)" : "rgba(255,255,255,0.04)",
                    color: count === c ? "#1A9E5C" : "rgba(232,245,238,0.5)", cursor: "pointer",
                  }}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          {error && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px", fontWeight: 500 }}>{error}</p>}

          <button onClick={generate} disabled={loading} style={{
            width: "100%", marginTop: "14px", padding: "12px", borderRadius: "12px",
            fontWeight: 700, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer",
            border: "none", background: loading ? "rgba(26,158,92,0.3)" : "linear-gradient(135deg, #1A9E5C, #1D74BB)",
            color: "#fff", transition: "opacity 0.2s", opacity: loading ? 0.7 : 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            fontFamily: "inherit",
          }}>
            {loading ? (
              <>
                <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Генерирую {count} {count === 1 ? "пост" : count < 5 ? "поста" : "постов"}...
              </>
            ) : (
              <>⚡ Сгенерировать {count} {count === 1 ? "пост" : count < 5 ? "поста" : "постов"}</>
            )}
          </button>
        </div>

        {/* Results */}
        {posts.length > 0 && (
          <div style={{ flex: 1, overflow: "auto", padding: "16px 28px 28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(232,245,238,0.3)", marginBottom: "12px" }}>
              РЕЗУЛЬТАТ — {posts.length} {posts.length === 1 ? "ПОСТ" : "ПОСТА"} ДЛЯ {selectedPlatform?.label.toUpperCase()}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {posts.map((post, i) => (
                <div key={i} style={{
                  borderRadius: "14px", overflow: "hidden",
                  border: expanded === i ? "1px solid rgba(26,158,92,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  background: expanded === i ? "rgba(26,158,92,0.06)" : "rgba(255,255,255,0.03)",
                  transition: "all 0.2s",
                }}>
                  <div
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                      background: `${selectedPlatform?.color}20`,
                      border: `1px solid ${selectedPlatform?.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px",
                    }}>{selectedPlatform?.emoji}</div>
                    <span style={{ fontSize: "13px", fontWeight: 600, flex: 1, color: expanded === i ? "#e8f5ee" : "rgba(232,245,238,0.7)" }}>
                      {post.title}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(232,245,238,0.3)", transition: "transform 0.2s", display: "inline-block", transform: expanded === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                  </div>

                  {expanded === i && (
                    <div style={{ padding: "0 16px 16px" }}>
                      <div style={{
                        background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "14px",
                        fontSize: "13px", lineHeight: 1.75, color: "rgba(232,245,238,0.85)",
                        whiteSpace: "pre-wrap", marginBottom: "10px",
                      }}>
                        {post.body}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                        {post.hashtags?.map(h => (
                          <span key={h} style={{
                            fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px",
                            background: "rgba(29,116,187,0.15)", border: "1px solid rgba(29,116,187,0.3)",
                            color: "#5BC4F5",
                          }}>{h}</span>
                        ))}
                      </div>
                      {post.cta && (
                        <div style={{
                          fontSize: "12px", padding: "8px 12px", borderRadius: "8px",
                          background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)",
                          color: "#F5A623", marginBottom: "12px", fontWeight: 500,
                        }}>
                          🎯 CTA: {post.cta}
                        </div>
                      )}
                      <button onClick={() => copyPost(post, i)} style={{
                        padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 700,
                        border: copied === i ? "1px solid rgba(26,158,92,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer", fontFamily: "inherit",
                        background: copied === i ? "rgba(26,158,92,0.3)" : "rgba(26,158,92,0.15)",
                        color: copied === i ? "#1A9E5C" : "rgba(232,245,238,0.6)",
                        transition: "all 0.2s",
                      }}>
                        {copied === i ? "✓ Скопировано!" : "📋 Копировать пост"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", opacity: 0.4 }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚡</div>
            <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>Введи тему и нажми «Сгенерировать»</p>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
