import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-title",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ester Neves | English Teacher",
  description:
    "Aprenda inglês de forma leve, moderna e prática com Ester Neves.",
  keywords: [
    "ingles online",
    "professora de ingles",
    "english teacher",
    "aulas de ingles",
    "ingles conversacao",
  ],
  authors: [{ name: "Ester Neves" }],
  openGraph: {
    title: "Ester Neves | English Teacher",
    description:
      "Aprenda inglês de forma leve, moderna e prática.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}