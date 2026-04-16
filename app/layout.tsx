import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FloatSafe — Safe Floating Point Comparison Tool",
  description: "Safe floating-point comparison utilities with interactive playground, code generation, and educational content for developers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-[#c9d1d9] font-mono antialiased">{children}</body>
    </html>
  );
}
