"use client";

import { useState } from "react";

const questions = [
  {
    question: "She ____ to school every day.",
    options: ["go", "goes", "going"],
    answer: 1,
  },
  {
    question: "I ____ never been to London.",
    options: ["have", "has", "had"],
    answer: 0,
  },
];

export default function TesteNivel() {
  const [current, setCurrent] = useState(0);

  function handleAnswer() {
    setCurrent(current + 1);
  }

  return (
    <main style={{
      background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Poppins, sans-serif"
    }}>
      
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 20,
        width: "90%",
        maxWidth: 400,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        
        <h2>Pergunta {current + 1}</h2>

        <p style={{ fontSize: 18, margin: "20px 0" }}>
          {questions[current]?.question}
        </p>

        {questions[current]?.options.map((opt, i) => (
          <button
            key={i}
            onClick={handleAnswer}
            style={{
              display: "block",
              width: "100%",
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
              border: "none",
              background: "#a78bfa",
              color: "white",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        ))}

      </div>
    </main>
  );
}