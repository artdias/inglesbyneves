'use client'

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
      padding: "20px",
      display: "flex",
      justifyContent: "center"
    }}>

      <div style={{ maxWidth: "500px", width: "100%" }}>

        {/* CARD PRINCIPAL */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          marginBottom: "20px"
        }}>

          <img 
            src="/perfil.jpg"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #a78bfa",
              marginBottom: "10px"
            }}
          />

          <h2 style={{ margin: "10px 0" }}>Profª Neves 💜</h2>

          <p style={{ fontSize: "14px", opacity: 0.7 }}>
            Aprenda inglês de forma simples, prática e sem complicação ✨
          </p>

          {/* BOTÕES */}
          <div style={{ marginTop: "20px" }}>

            <a href="/teste" style={botao}>
              🎯 Fazer teste de nível
            </a>

            <a href="/materiais" style={{...botao, marginTop: "10px"}}>
              📚 Baixar materiais gratuitos
            </a>

          </div>
        </div>

        {/* VÍDEO */}
        <div style={card}>
          <h3>🎥 Veja como funciona</h3>

          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            style={{ borderRadius: "10px", marginTop: "10px" }}
          />
        </div>

        {/* AVALIAÇÕES */}
        <div style={card}>
          <h3>💬 O que meus alunos dizem</h3>

          <div style={{ marginTop: "10px", fontSize: "14px" }}>
            <p>"Amei as aulas!" ⭐⭐⭐⭐⭐</p>
            <p>"Didática perfeita!" ⭐⭐⭐⭐⭐</p>
            <p>"Super recomendo!" ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        {/* CONTATO */}
        <div style={card}>
          <h3>📲 Fale comigo</h3>

          <a href="https://wa.me/seunumero" style={botao}>
            WhatsApp
          </a>

          <p style={{ fontSize: "12px", marginTop: "10px", opacity: 0.6 }}>
            Email: contato@email.com<br/>
            Tel: (00) 00000-0000
          </p>
        </div>

      </div>
    </div>
  )
}

// estilos reutilizáveis
const card = {
  background: "white",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  textAlign: "center" as const
}

const botao = {
  display: "block",
  padding: "12px",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "0.3s"
}