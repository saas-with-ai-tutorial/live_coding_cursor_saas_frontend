import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo SaaS - Centralize Your Todos from Anywhere",
  description: "Unlimited todos, centralized, effortless. Connect your Gmail, WhatsApp, Slack, and more to automatically extract and manage todos using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
