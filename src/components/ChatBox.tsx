import   { useState } from "react";

export default function ChatBox() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("https://cruxws.onrender.com/api/v1" + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.data.answer);
    } catch (err) {
      setResponse("❌ Failed to fetch answer.");
    }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        placeholder="Ask a question about your PDF..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      {response && (
        <div style={{ marginTop: "1.5rem", whiteSpace: "pre-wrap" }}>
          <strong>Answer:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
