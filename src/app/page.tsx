"use client";

import { useState, useEffect } from "react";

const STYLES = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "casual", label: "Casual", emoji: "😎" },
  { id: "witty", label: "Witty", emoji: "🎭" },
  { id: "educational", label: "Educational", emoji: "📚" },
  { id: "story", label: "Story", emoji: "📖" },
];

const MAX_CHARS = 2800;

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("threadflow_usage");
    if (saved) {
      setUsageCount(parseInt(saved, 10));
    }
  }, []);

  const charCount = input.length;
  const isOverLimit = charCount > MAX_CHARS;

  const handleRewrite = async () => {
    if (!input.trim()) {
      setError("Please enter some text to rewrite");
      return;
    }
    if (isOverLimit) {
      setError(`Text exceeds ${MAX_CHARS} characters`);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const style = STYLES.find((s) => s.id === selectedStyle);
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          style: style?.label || "Professional",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rewrite");
      }

      const data = await response.json();
      setOutput(data.result);

      // Update usage count
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem("threadflow_usage", newCount.toString());
    } catch (err) {
      setError("Failed to rewrite. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ThreadFlow
              </h1>
              <p className="text-xs text-zinc-500">AI Tweet Rewriter</p>
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            <span className={usageCount >= 5 ? "text-amber-400" : ""}>
              {usageCount}/5 free rewrites
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Style Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-3">
            Choose your style
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedStyle === style.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
                }`}
              >
                <span className="mr-1.5">{style.emoji}</span>
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">
                Your tweet or thread
              </label>
              <button
                onClick={handleClear}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your tweet or thread here..."
              className="w-full h-80 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none font-mono text-sm"
            />
            <div className="flex items-center justify-between text-sm">
              <span className={isOverLimit ? "text-red-400" : "text-zinc-500"}>
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
              </span>
              <button
                onClick={handleRewrite}
                disabled={isLoading || isOverLimit || !input.trim()}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Rewriting...
                  </span>
                ) : (
                  "✨ Rewrite"
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>

          {/* Output Panel */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-400">
              Rewritten result
            </label>
            <div className={`relative h-80 rounded-xl border-2 transition-colors ${
              output ? "border-green-600/50 bg-zinc-900/50" : "border-zinc-800 border-dashed bg-zinc-900/30"
            }`}>
              {output ? (
                <>
                  <textarea
                    readOnly
                    value={output}
                    className="w-full h-full bg-transparent p-4 text-zinc-100 resize-none font-mono text-sm focus:outline-none"
                  />
                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={handleCopy}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                      }`}
                    >
                      {copied ? "✓ Copied!" : "📋 Copy"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-600">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">Your rewritten content will appear here</p>
                  </div>
                </div>
              )}
            </div>
            {output && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">
                  {output.length.toLocaleString()} characters
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>Powered by Claude AI • Made for creators</p>
        </footer>
      </main>
    </div>
  );
}
