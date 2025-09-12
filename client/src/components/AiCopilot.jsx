// src/components/AiCopilotWidget.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function AiCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I’m your HustleHub AI Copilot. Paste a job posting or ask me anything about your job search.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/agent", {
        userMessage: userMsg.content,
        context: { ts: new Date().toISOString() },
      });

      // IMPORTANT: your backend returns { message: "..."} not { content: "..." }
      const aiText = res?.data?.message ?? "No response";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Error contacting AI service. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((s) => !s)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-xl bg-blue-600 text-white w-14 h-14 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        title="HustleHub Copilot"
      >
        {/* chat bubble icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-3.47-.61L3 21l1.61-4.53A7.94 7.94 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-96 max-w-[92vw] h-[28rem] bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between">
            <div className="font-semibold">HustleHub Copilot</div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-1 bg-blue-500/40 hover:bg-blue-500/60"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 text-sm bg-white"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] break-words ${
                  m.role === "assistant"
                    ? "bg-slate-100 text-slate-800 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-slate-500 text-xs">Thinking…</div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-slate-200 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask me anything…"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-sm"
              >
                Send
              </button>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Press <kbd>Enter</kbd> to send • <kbd>Shift+Enter</kbd> for newline
            </div>
          </div>
        </div>
      )}
    </>
  );
}
