import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate custom QR codes with different colors",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgMTJoNCIvPjxwYXRoIGQ9Ik0xNiA0aDR2NCIvPjxwYXRoIGQ9Ik0xNiAxNmg0djQiLz48cGF0aCBkPSJNMTIgMTJoNCIvPjxwYXRoIGQ9Ik0xMiAxNmg0Ii8+PHBhdGggZD0iTTggMTZoLTR2LTQiLz48cGF0aCBkPSJNMTIgMTJ2NCIvPjxwYXRoIGQ9Ik0xMiA4djQiLz48cGF0aCBkPSJNOCA4aDR2NCIvPjwvc3ZnPg==',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
