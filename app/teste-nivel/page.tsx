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
  {
    question: "He ____ a car.",
    options: ["have", "has", "had"],
    answer: 1,
  },
];

function getLevel(score: number) {
  if (score <= 1) return "Básico";
  if (score <= 3) return "Intermediário";
  return "Avançado";
}

export default function TesteNivel() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<"quiz" | "form" | "result">("quiz");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleAnswer(index: number) {
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setStep("form");
    }
  }

  const progress = ((current + 1) / questions.length) * 100;

  // FORM
  if (step === "form") {
    return (
      <main className="page">
        <div className="card">
          <h2>🎯 Falta só um passo!</h2>
          <p>Digite seus dados para ver seu resultado 👇</p>

          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Seu WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={() => setStep("result")}>
            Ver meu resultado
          </button>
        </div>

        {styles}
      </main>
    );
  }

  // RESULT
  if (step === "result") {
    const level = getLevel(score);

    const message = `Olá! Me chamo ${name}.

📊 Pontuação: ${score}/${questions.length}
📈 Nível: ${level}

Quero um plano personalizado!`;

    const whatsappLink = `https://wa.me/5599999999999?text=${encodeURIComponent(
      message
    )}`;

    return (
      <main className="page">
        <div className="card">
          <h1>Seu nível: {level}</h1>

          <p>
            {level === "Básico" && "Você está começando, mas pode evoluir rápido!"}
            {level === "Intermediário" &&
              "Você já tem uma boa base e pode avançar!"}
            {level === "Avançado" &&
              "Excelente! Vamos refinar seu inglês."}
          </p>

          <p className="highlight">
            Uma professora vai analisar seu resultado e montar um plano exclusivo.
          </p>

          <button onClick={() => window.open(whatsappLink, "_blank")}>
            Quero meu plano personalizado
          </button>
        </div>

        {styles}
      </main>
    );
  }

  // QUIZ
  return (
    <main className="page">
      <div className="card">
        <h2>Pergunta {current + 1} de {questions.length}</h2>

        {/* BARRA DE PROGRESSO */}
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="question">{questions[current].question}</p>

        {questions[current].options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)}>
            {opt}
          </button>
        ))}
      </div>

      {styles}
    </main>
  );
}

const styles = (
  <style jsx>{`
    .page {
      background: linear-gradient(135deg, #a78bfa, #7dd3fc);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial;
      padding: 20px;
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 25px;
      width: 100%;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      animation: fadeUp 0.5s ease;
    }

    .question {
      font-size: 18px;
      margin: 20px 0;
    }

    .progress {
      height: 8px;
      background: #e5e7eb;
      border-radius: 10px;
      margin: 10px 0 20px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: #a78bfa;
      transition: width 0.3s;
    }

    input {
      width: 100%;
      padding: 12px;
      margin-top: 10px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }

    button {
      width: 100%;
      padding: 14px;
      margin-top: 12px;
      border: none;
      border-radius: 12px;
      background: #a78bfa;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover {
      background: #8b5cf6;
      transform: scale(1.02);
    }

    .highlight {
      margin-top: 15px;
      font-weight: bold;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
);