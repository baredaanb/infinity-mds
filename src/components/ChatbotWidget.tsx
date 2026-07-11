"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you with Infinity Solution's services today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { role: "user", content: inputValue.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate AI typing delay, then escalate to form
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Thanks for reaching out! I'm an AI assistant. To better assist you, could you please provide your email or would you like to book a discovery call?",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] overflow-hidden rounded-2xl glass-panel shadow-2xl flex flex-col"
            style={{ height: "450px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--surface-base)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Infinity Assistant</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--surface-base)] bg-opacity-50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-[var(--accent-primary)] text-white rounded-br-sm"
                        : "bg-[var(--surface-elevated)] hairline-border text-[var(--text-primary)] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-[var(--border-subtle)] bg-[var(--surface-base)] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-full bg-[var(--accent-primary)] text-white disabled:opacity-50 hover:bg-[var(--accent-vibrant)] transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--accent-vibrant)] transition-colors ml-auto"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
