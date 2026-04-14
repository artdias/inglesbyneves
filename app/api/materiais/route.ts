import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const pastaArquivos = path.join(process.cwd(), 'public/arquivos')
    const pastaCapas = path.join(process.cwd(), 'public/capas')

    const arquivos = fs.readdirSync(pastaArquivos)

    const lista = arquivos.map((nome: string) => {
      const nomeBase = nome.split('.').slice(0, -1).join('.')
      const capaPath = path.join(pastaCapas, nomeBase + '.jpg')

      const temCapa = fs.existsSync(capaPath)

      return {
        nome,
        url: `/arquivos/${nome}`,
        capa: temCapa 
          ? `/capas/${nomeBase}.jpg`
          : '/sem-capa.png'
      }
    })

    return NextResponse.json(lista)
    
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao ler arquivos' }, { status: 500 })
  }
}