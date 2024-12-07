import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("https://t2i-ypp5.onrender.com/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const imageBlob = await response.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Text-to-Image Generator</h1>
      </header>
      <main className="main">
        <textarea
          className="prompt-input"
          placeholder="Enter your creative text prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="generate-button"
          onClick={generateImage}
          disabled={loading || !prompt.trim()}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        {error && <p className="error">{error}</p>}
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="Generated visual" />
            <a
            href={imageUrl}
            download="generated-image.jpg"
            style={{
              marginTop: "10px",
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Download Image
          </a>
          </div>
          
        )}
         
      </main>
      <footer className="footer">
        <p>Powered by AI | Hugging Face</p>
      </footer>
    </div>
  );
};

export default App;
