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
  {
    question: "They ____ playing now.",
    options: ["is", "are", "am"],
    answer: 1,
  },
];

function getLevel(score: number) {
  if (score <= 1) return "Básico";
  if (score === 2) return "Intermediário";
  return "Avançado";
}

export default function TesteNivel() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<"quiz" | "result">("quiz");

  function handleAnswer(index: number) {
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setStep("result");
      }
    }, 300);
  }

  const progress = ((current + 1) / questions.length) * 100;

  if (step === "result") {
    const level = getLevel(score);

    const message = `Olá! Fiz o teste de inglês.

Resultado: ${score}/${questions.length}
Nível: ${level}

Quero melhorar meu inglês!`;

    const link = `https://wa.me/5599999999999?text=${encodeURIComponent(message)}`;

    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={{ color: "#7c3aed" }}>Seu nível: {level}</h1>

          <p style={{ marginTop: 10 }}>
            {level === "Básico" && "Você está começando, mas pode evoluir rápido 🚀"}
            {level === "Intermediário" && "Você já tem uma boa base 👏"}
            {level === "Avançado" && "Excelente nível! 🔥"}
          </p>

          <div style={styles.score}>
            {score} / {questions.length}
          </div>

          <button
            style={styles.whatsapp}
            onClick={() => window.open(link, "_blank")}
          >
            💬 Quero meu plano no WhatsApp
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h3>Pergunta {current + 1}/{questions.length}</h3>

        {/* PROGRESSO */}
        <div style={styles.progress}>
          <div style={{ ...styles.bar, width: `${progress}%` }} />
        </div>

        <p style={styles.question}>
          {questions[current].question}
        </p>

        {questions[current].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            style={styles.option}
          >
            {opt}
          </button>
        ))}
      </div>
    </main>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Poppins, sans-serif",
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center" as const
  },

  question: {
    fontSize: 20,
    margin: "20px 0",
  },

  option: {
    display: "block",
    width: "100%",
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    border: "none",
    background: "#a78bfa",
    color: "white",
    cursor: "pointer",
    fontSize: 16,
  },

  progress: {
    height: 8,
    background: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },

  bar: {
    height: "100%",
    background: "#7c3aed",
  },

  score: {
    fontSize: 28,
    fontWeight: "bold",
    margin: "15px 0",
  },

  whatsapp: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
  },
};