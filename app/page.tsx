"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showWhats, setShowWhats] = useState(false);

  // ⏱️ Aparece depois de 5s (estratégia)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhats(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <main className="page">
      <div className="container">

        {/* PERFIL */}
        <div className="card fade">
          <img src="/perfil.jpg" className="avatar" />

          <h1>Profª Neves</h1>
          <p>Aprenda inglês de forma simples e prática</p>

          <div className="buttons">
            <Link href="/teste-nivel">
              <button className="primary">Teste grátis</button>
            </Link>

            <Link href="/material">
              <button className="secondary">Material gratuito</button>
            </Link>
          </div>
        </div>

        {/* VÍDEO */}
        <div className="card fade">
          <h2>Veja como funciona</h2>

          <iframe
            width="100%"
            height="260"
            src="https://www.youtube.com/embed/L_LUpnjgPso"
            style={{ border: "none", borderRadius: 12 }}
            allowFullScreen
          />
        </div>

        {/* AVALIAÇÕES */}
        <div className="card fade">
          <h2>O que meus alunos dizem</h2>

          <div className="carousel" ref={trackRef}>
            {reviews.map((r, i) => (
              <div key={i} className="review">{r}</div>
            ))}
          </div>

          <div className="carousel-buttons">
            <button onClick={scrollLeft}>⬅</button>
            <button onClick={scrollRight}>➡</button>
          </div>
        </div>

        {/* CONTATO */}
        <div className="card fade">
          <h2>Fale comigo</h2>

          <div className="socials">
            <a
              href="https://wa.me/5599999999999?text=Olá, quero aprender inglês!"
              target="_blank"
              className="whatsapp"
            >
              WhatsApp
            </a>

            <a href="#" className="instagram">Instagram</a>
            <a href="#" className="facebook">Facebook</a>
          </div>
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="footer">
        CNPJ: 00.000.000/0002-00<br />
        Email: contato@email.com<br />
        Telefone: (00) 00000-0000
      </div>

      {/* BOTÃO INTELIGENTE */}
      {showWhats && (
        <a
          href="https://wa.me/5599999999999?text=Oi! Vi seu site e quero aprender inglês 😊"
          target="_blank"
          className="whatsapp-float-text"
        >
          💬 Fale comigo
        </a>
      )}

      {/* ESTILOS */}
      <style jsx>{`
        .page {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #e9d5ff, #f5d0fe);
          min-height: 100vh;
        }

        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }

        .card {
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          font-size: 22px;
        }

        p {
          color: #555;
        }

        .buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 15px;
        }

        button {
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          cursor: pointer;
          width: 170px;
          transition: 0.3s;
        }

        .primary {
          background: #22c55e;
          color: white;
        }

        .secondary {
          background: #f472b6;
          color: white;
        }

        button:hover {
          transform: scale(1.05);
        }

        .avatar {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #c084fc;
        }

        .carousel {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 10px;
        }

        .review {
          min-width: 250px;
          background: #f8fafc;
          padding: 15px;
          border-radius: 12px;
        }

        .carousel-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .socials a {
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          text-decoration: none;
        }

        .whatsapp {
          background: #25d366;
        }

        .instagram {
          background: #ec4899;
        }

        .facebook {
          background: #3b82f6;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding: 20px;
        }

        /* BOTÃO FLUTUANTE */
        .whatsapp-float-text {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #25d366;
          color: white;
          padding: 12px 18px;
          border-radius: 30px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          z-index: 999;
          animation: fadeInUp 0.5s ease;
        }

        .whatsapp-float-text:hover {
          transform: scale(1.05);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 500px) {
          button {
            width: 100%;
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