import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "🔮 Mail Monsoon",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} bg-[#2a303c] ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
