import {
  MessageCircle,
 BookOpen,
  User,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f2] relative overflow-hidden">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 px-5 py-6">

        {/* TOPO */}
        <header className="max-w-md mx-auto flex justify-end">
          <button className="bg-white/70 backdrop-blur-lg p-3 rounded-full border border-white/50 shadow-lg hover:scale-105 transition duration-300">
            <User size={20} />
          </button>
        </header>

        {/* PERFIL */}
        <section className="max-w-md mx-auto text-center mt-6">

          <div className="relative max-w-sm mx-auto">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-200 to-blue-300 rounded-[2.5rem] blur-2xl opacity-50 scale-105"></div>

            {/* CARD FOTO */}
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-3 shadow-2xl">

              <img
                src="/perfil.jpg"
                alt="Professora Ester Neves"
                className="w-full h-[320px] object-cover rounded-[2rem]"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold mt-6 text-[#1f1f1f]">
            Teacher Ester Neves
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed px-4">
            Professora de inglês para quem quer aprender de forma natural e sem travar.
            Sou britânica, filha de pais brasileiros, com inglês nativo e português fluente,
            Aulas 1:1, método personalizado, foco total em speaking, sem julgamento.
          </p>

        </section>

        {/* LINKS */}
        <section className="max-w-md mx-auto mt-10 space-y-4">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/5514998139398"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-[#25D366] text-white p-5 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <MessageCircle size={28} />
              <div>
                <p className="font-semibold text-lg">
                  WhatsApp
                </p>
                <p className="text-sm opacity-80">
                  Fale comigo diretamente
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/teacher.esterneves?igsh=b3BvZDBwa3I4Z3Rt"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📸</span>

              <div>
                <p className="font-semibold text-lg">
                  Instagram
                </p>

                <p className="text-sm text-gray-500">
                  Conteúdo diário
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* YOUTUBE */}
          <a
            href="https://www.youtube.com/@inglesbyneves"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">▶</span>

              <div>
                <p className="font-semibold text-lg">
                  YouTube
                </p>

                <p className="text-sm text-gray-500">
                  Aulas e dicas
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* TIKTOK */}
          <a
            href="https://www.tiktok.com/@inglesbyneves"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎵</span>

              <div>
                <p className="font-semibold text-lg">
                  TikTok
                </p>

                <p className="text-sm text-gray-500">
                  Vídeos rápidos
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/profile.php?id=61588798522914"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">👍</span>

              <div>
                <p className="font-semibold text-lg">
                  Facebook
                </p>

                <p className="text-sm text-gray-500">
                  Comunidade e novidades
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* SPOTIFY */}
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎧</span>

              <div>
                <p className="font-semibold text-lg">
                  Spotify
                </p>

                <p className="text-sm text-gray-500">
                  Podcasts e playlists
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* TESTE */}
          <a
            href="#"
            className="group flex items-center justify-between bg-[#1F2A5A] text-white p-5 rounded-3xl shadow-2xl hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📝</span>

              <div>
                <p className="font-semibold text-lg">
                  Teste de nível
                </p>

                <p className="text-sm opacity-70">
                  Descubra seu inglês
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

          {/* EBOOKS */}
          <a
            href="#"
            className="group flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <BookOpen size={28} />

              <div>
                <p className="font-semibold text-lg">
                  Materiais gratuitos
                </p>

                <p className="text-sm text-gray-500">
                  Ebooks e conteúdos
                </p>
              </div>
            </div>

            <span className="text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>

        </section>

        {/* FOOTER */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          © 2026 TerrarTcriativ
        </footer>

      </div>
    </main>
  );
}