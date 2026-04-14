'use client'

import { useEffect, useState } from 'react'

export default function Materiais() {

  const [arquivos, setArquivos] = useState([])

  useEffect(() => {
    fetch('/api/materiais')
      .then(res => res.json())
      .then(data => setArquivos(data))
  }, [])

	  return (
	  <div style={{
		minHeight: "100vh",
		background: "linear-gradient(135deg, #1e1b4b, #0ea5e9)",
		padding: "30px"
	  }}>

		<div style={{
		  maxWidth: "1100px",
		  margin: "auto"
		}}>

		  {/* HEADER */}
		  <div style={{
			textAlign: "center",
			color: "white",
			marginBottom: "30px"
		  }}>
			<h1 style={{fontSize: "32px", marginBottom: "10px"}}>
			  📚 Materiais Gratuitos
			</h1>
			<p style={{opacity: 0.8}}>
			  Aprenda inglês com conteúdos práticos e diretos
			</p>
		  </div>

		  {/* GRID */}
		  <div style={{
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
			gap: "20px"
		  }}>

			{arquivos.map((item, i) => (
			  <div key={i} style={{
				background: "white",
				borderRadius: "16px",
				overflow: "hidden",
				boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
				transition: "0.3s",
				cursor: "pointer"
			  }}
			  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
			  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
			  >

				{/* CAPA */}
				<img 
				  src={item.capa}
				  style={{
					width: "100%",
					height: "150px",
					objectFit: "cover"
				  }}
				/>

				{/* CONTEÚDO */}
				<div style={{padding: "15px"}}>

				  <h3 style={{
					fontSize: "15px",
					marginBottom: "10px",
					color: "#111827"
				  }}>
					{item.nome}
				  </h3>

				  <a 
					href={item.url} 
					download
					style={{
					  display: "block",
					  textAlign: "center",
					  padding: "10px",
					  background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
					  color: "white",
					  borderRadius: "10px",
					  textDecoration: "none",
					  fontSize: "14px",
					  fontWeight: "bold"
					}}
				  >
					⬇ Baixar
				  </a>

				</div>

			  </div>
			))}

		  </div>

		</div>
	  </div>
	)
}