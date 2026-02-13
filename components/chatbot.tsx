"use client";

import { useEffect, useRef, useState } from "react";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Bonjour 👋 Je suis l’assistant de TimeTravel Agency. Dites-moi ce que vous aimez (art, aventure, histoire…) et je vous recommande une époque !",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Convert to the format expected by the API route
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg =
          data?.error ||
          "Erreur côté serveur. Vérifiez votre clé API et la route /api/chat.";
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply ?? "Je n’ai pas de réponse pour le moment." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur réseau. Vérifiez que le serveur Next.js tourne bien (npm run dev).",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-yellow-500 text-black shadow-lg hover:bg-yellow-400 transition flex items-center justify-center"
        aria-label="Open chatbot"
        title="Chatbot"
      >
        {/* simple chat icon */}
        <span className="text-2xl">💬</span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 text-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div className="font-semibold">TimeTravel Assistant</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="h-[360px] overflow-y-auto px-3 py-3 space-y-3"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-yellow-500 text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-white/10 text-white/80">
                  Réflexion en cours…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Posez-moi vos questions sur les voyages temporels…"
                className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-yellow-500/70"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400 disabled:opacity-50 transition"
              >
                Envoyer
              </button>
            </div>

            <div className="mt-2 text-xs text-white/50">
              Astuce : appuie sur <span className="text-white/70">Entrée</span> pour envoyer.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
