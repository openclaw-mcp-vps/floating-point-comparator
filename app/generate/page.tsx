import type { Metadata } from "next";

import { CodeGenerator } from "@/components/CodeGenerator";
import { PaywallNotice } from "@/components/PaywallNotice";
import { hasPaidAccess } from "@/lib/auth";

export const metadata: Metadata = {
  title: "FloatSafe Code Generator | Multi-language Safe Compare",
  description:
    "Generate production-ready floating-point comparison utilities across TypeScript, Python, Go, Java, C#, Rust, and C++."
};

export default async function GeneratePage() {
  const paidAccess = await hasPaidAccess();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-white">Safe Comparison Code Generator</h1>
        <p className="max-w-3xl text-zinc-300">
          Generate and copy floating-point comparison helpers tuned for your language and risk tolerance.
          Avoid one-off implementations that miss NaN, Infinity, or scale-dependent precision edges.
        </p>
      </div>

      {paidAccess ? (
        <CodeGenerator />
      ) : (
        <PaywallNotice
          title="Pro access required"
          description="Code generation is part of Pro. Checkout with Stripe and unlock this workspace in your browser session."
        />
      )}
    </main>
  );
}
