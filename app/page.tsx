'use client'

import { useState } from 'react'

export default function Home() {

  const depoimentos = [
    {
      nome: "Ana Clara",
      foto: "https://i.pravatar.cc/100?img=1",
      texto: "Amei os materiais! Muito fáceis de entender 💖"
    },
    {
      nome: "João Pedro",
      foto: "https://i.pravatar.cc/100?img=2",
      texto: "Finalmente estou evoluindo no inglês 🚀"
    },
    {
      nome: "Mariana",
      foto: "https://i.pravatar.cc/100?img=3",
      texto: "Didática incrível, recomendo demais!"
    }
  ]

  const [index, setIndex] = useState(0)

  const next = () => setIndex((index + 1) % depoimentos.length)
  const prev = () => setIndex((index - 1 + depoimentos.length) % depoimentos.length)

  return (
    <div style={{
      fontFamily: "sans-serif",
      background: "linear-gradient(135deg, #ede9fe, #e0f2fe)"
    }}>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          ✨ Aprenda Inglês de Forma Simples
        </h1>
        <p style={{ marginBottom: "20px", opacity: 0.7 }}>
          Materiais práticos para você evoluir rápido
        </p>

        {/* VÍDEO */}
        <div style={{
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Vídeo"
          />
        </div>

        {/* BOTÕES */}
        <div style={{ marginTop: "30px" }}>
          <a href="/materiais" style={btnPrimary}>
            📚 Ver Materiais
          </a>
        </div>
      </section>

      {/* REDES SOCIAIS */}
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2>🌐 Me acompanhe</h2>

        <div style={{ marginTop: "15px" }}>
          <a href="#" style={btnSocial}>Instagram</a>
          <a href="#" style={btnSocial}>Facebook</a>
          <a href="#" style={btnSocial}>TikTok</a>
          <a href="#" style={btnSocial}>YouTube</a>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{
        padding: "40px",
        textAlign: "center"
      }}>
        <h2>💬 O que dizem</h2>

        <div style={{
          maxWidth: "400px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
        }}>
          <img
            src={depoimentos[index].foto}
            style={{
              width: "80px",
              borderRadius: "50%",
              marginBottom: "10px"
            }}
          />

          <h3>{depoimentos[index].nome}</h3>
          <p style={{ opacity: 0.7 }}>{depoimentos[index].texto}</p>

          <div style={{ marginTop: "10px" }}>
            <button onClick={prev}>⬅</button>
            <button onClick={next}>➡</button>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <footer style={{
        background: "#1e1b4b",
        color: "white",
        textAlign: "center",
        padding: "30px"
      }}>
        <p>📧 email@email.com</p>
        <p>📞 (11) 99999-9999</p>
        <p>🏢 CNPJ: 00.000.000/0001-00</p>
      </footer>

    </div>
  )
}

const btnPrimary = {
  padding: "12px 20px",
  background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
  color: "white",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold"
}

const btnSocial = {
  margin: "5px",
  padding: "10px 15px",
  background: "white",
  borderRadius: "10px",
  textDecoration: "none",
  display: "inline-block"
}