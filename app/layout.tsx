import "./globals.css";
import { AppProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}