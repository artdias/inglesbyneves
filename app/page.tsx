"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (!trackRef.current) return;

      index++;
      if (index > 3) index = 0;

      trackRef.current.style.transform = `translateX(-${index * 80}%)`;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="page">
      <div className="container">
        
        {/* PERFIL */}
        <div className="card fade">
          <img src="/perfilr1.png" className="avatar" />

          <h1>Profª Neves</h1>
          <p>Aprenda inglês de forma simples e prática</p>

          <Link href="/teste-nivel">
            <button>Descobrir meu nível de inglês (GRÁTIS)</button>
          </Link>

          <Link href="/material">
            <button>Baixar material gratuito</button>
          </Link>
        </div>

        {/* VÍDEO */}
        <div className="card fade">
          <h2>Veja como funciona</h2>

          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/L_LUpnjgPso"
            style={{ border: "none", borderRadius: 10 }}
            allowFullScreen
          />
        </div>

        {/* AVALIAÇÕES */}
        <div className="card fade">
          <h2>O que meus alunos dizem</h2>

          <div className="carousel">
            <div ref={trackRef} className="track">
              {reviews.map((r, i) => (
                <div key={i} className="review">{r}</div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTATO */}
        <div className="card fade">
          <h2>Fale comigo</h2>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/5599999999999?text=Olá, quero aprender inglês!",
                "_blank"
              )
            }
          >
            WhatsApp
          </button>
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="footer">
        CNPJ: 00.000.000/0002-00<br />
        Email: contato@email.com<br />
        Telefone: (00) 00000-0000
      </div>

      {/* ESTILOS */}
      <style jsx>{`
        .page {
          margin: 0;
          font-family: Arial;
          background: linear-gradient(135deg, #a78bfa, #7dd3fc);
          min-height: 100vh;
        }

        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        .fade {
          animation: fadeUp 0.8s ease forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          transition: 0.3s;
        }

        button:hover {
          background: #8b5cf6;
          transform: scale(1.02);
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #a78bfa;
          margin-bottom: 10px;
        }

        .carousel {
          overflow: hidden;
        }

        .track {
          display: flex;
          gap: 10px;
          transition: transform 0.4s ease;
        }

        .review {
          min-width: 80%;
          background: #f8fafc;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: white;
          padding: 20px;
        }

        @media (min-width: 600px) {
          .review {
            min-width: 30%;
          }
        }
      `}</style>
    </main>
  );
}

const reviews = [
  "A melhor professora! ⭐⭐⭐⭐⭐",
  "Aprendi muito rápido! ⭐⭐⭐⭐⭐",
  "Didática perfeita! ⭐⭐⭐⭐⭐",
  "Super recomendo! ⭐⭐⭐⭐⭐",
  "Muito paciente! ⭐⭐⭐⭐⭐",
  "Aulas incríveis! ⭐⭐⭐⭐⭐",
];