import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:4173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "ЧИСТО — премиальная автомойка в Москве";
  const description = "Бережная мойка, премиум-уход и люкс-детейлинг. Выберите свободное время и запишитесь онлайн.";
  return {
    metadataBase,
    title,
    description,
    keywords: ["автомойка Москва", "детейлинг", "премиальная мойка", "мойка автомобиля"],
    icons: { icon: "/favicon.svg" },
    openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1729, height: 910, alt: "ЧИСТО — больше, чем просто мойка" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
