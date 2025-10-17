import './App.css'
import { useState } from "react";

interface QuoteResponse {
  quote: string;
}

export default function App() {

  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async (): Promise<QuoteResponse> => {
    const res = await fetch(import.meta.env.VITE_API_URL);
    if (!res.ok) throw new Error("Failed to fetch quote");
    const data: QuoteResponse = await res.json();
    return data;
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await fetchQuote();
      setQuote(data.quote);
    } catch (err) {
      console.error(err);
      setQuote("nie udało się uzyskać cytatu, spróbuj ponownie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>Random Quote Machine</h1>
      </div>
      <div className="MainSegment">
        <h2>{quote || "cytat"}</h2>
        <button
          onClick={handleClick}
          disabled={loading}>Get quote</button>
      </div>
    </div>
  )
}