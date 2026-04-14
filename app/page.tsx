'use client'
export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #a78bfa, #7dd3fc)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "400px"
      }}>

        <img 
          src="/perfilr1.png"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "4px solid #a78bfa"
          }}
        />

        <h1>Profª Neves</h1>
        <p>Aprenda inglês de forma simples e prática</p>

        <button onClick={() => window.location.href='/teste'}>
          Fazer teste de nível
        </button>

        <br/><br/>

        <button onClick={() => window.location.href='/materiais'}>
          Baixar material gratuito
        </button>

      </div>

    </div>
  )
}