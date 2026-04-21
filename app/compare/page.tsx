import type { Metadata } from "next";

import { FloatingPointComparator } from "@/components/FloatingPointComparator";
import { PaywallNotice } from "@/components/PaywallNotice";
import { hasPaidAccess } from "@/lib/auth";

export const metadata: Metadata = {
  title: "FloatSafe Comparator | Compare Numbers Safely",
  description:
    "Run floating-point comparisons with tolerance and ULP analysis to avoid precision bugs in production systems."
};

export default async function ComparePage() {
  const paidAccess = await hasPaidAccess();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-white">Floating-Point Comparator</h1>
        <p className="max-w-3xl text-zinc-300">
          Evaluate risky comparisons with absolute tolerance, relative tolerance, and ULP distance. This
          tool surfaces hidden precision drift before it impacts payments or scientific thresholds.
        </p>
      </div>

      {paidAccess ? (
        <FloatingPointComparator />
      ) : (
        <PaywallNotice
          title="Pro access required"
          description="Your current session is locked. Complete Stripe checkout, then return to unlock the tool with a secure cookie."
        />
      )}
    </main>
  );
}
