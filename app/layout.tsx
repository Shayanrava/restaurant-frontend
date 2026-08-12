import type { Metadata } from "next";
import { Lalezar, Vazirmatn } from "next/font/google";
import "./globals.css";

// پیکربندی فونت‌ها
const lalezar = Lalezar({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-lalezar",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "رستوران سنتی شبستان",
  description: "طعم اصیل غذاهای ایرانی در فضایی گرم و دلنشین",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${lalezar.variable} ${vazirmatn.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}