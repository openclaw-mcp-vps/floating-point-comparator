import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "FloatSafe Compare | Safe floating point comparisons",
  description:
    "Prevent production bugs from floating point precision errors. Compare numbers safely, visualize rounding issues, and generate robust comparison helpers for your codebase.",
  keywords: [
    "floating point comparison",
    "epsilon comparison",
    "financial calculations",
    "scientific computing",
    "developer tools"
  ],
  openGraph: {
    title: "FloatSafe Compare",
    description:
      "Safe floating point comparison tool for developers handling money, science, and precision-critical systems.",
    url: "https://floatsafecompare.dev",
    siteName: "FloatSafe Compare",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FloatSafe Compare",
    description:
      "Visualize precision issues and generate safe comparison code in multiple languages."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-[#0d1117] font-[family-name:var(--font-space-grotesk)] text-zinc-100`}
      >
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b border-[#26304a]/70 bg-[#0d1117]/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                FloatSafe Compare
              </Link>
              <nav className="flex items-center gap-4 text-sm text-zinc-300">
                <Link href="/compare" className="hover:text-white">
                  Compare
                </Link>
                <Link href="/generate" className="hover:text-white">
                  Generate Code
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
