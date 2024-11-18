import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Provider";
import { DOMAIN_URL } from "@/lib/util";

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
  title: "Mail Monsoon",
  description: "Schedule emails and keep on sending them to increase your chances of getting a response",
  openGraph : {
  description: "Schedule emails and keep on sending them to increase your chances of getting a response",
  title: "Mail Monsoon",
  images  : ["https://asset.cloudinary.com/dvlz73wcr/b9910452274e5811fc7d672fbdf841fb"], // WHen we share link then we need a preview where some image is shown
  url : `${DOMAIN_URL}`
  },
  keywords : ["spam","email","nextjs"]
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
