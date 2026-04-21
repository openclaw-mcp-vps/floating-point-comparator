import Link from "next/link";
import { CheckCircle2, Code2, ShieldAlert, Wallet2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hasPaidAccess } from "@/lib/auth";

const faqItems = [
  {
    question: "Why not just use `a === b`?",
    answer:
      "IEEE-754 binary floating point cannot exactly represent many decimal fractions. Values that should match often differ by tiny binary residue, so strict equality fails in real production paths."
  },
  {
    question: "Where does this matter most?",
    answer:
      "Fintech ledgers, payout reconciliation, simulation models, ML metrics, and analytics pipelines all suffer silent corruption when comparisons ignore tolerance and scale."
  },
  {
    question: "What do I get in Pro?",
    answer:
      "Interactive compare workflows, drift visualization, and copy-ready comparison helpers for TypeScript, Python, Go, Java, C#, Rust, C++, and JavaScript."
  },
  {
    question: "How does access work?",
    answer:
      "Checkout runs through Stripe-hosted Payment Links. After successful payment, a signed cookie unlocks your tool workspace on this domain."
  }
];

export default async function HomePage() {
  const paidAccess = await hasPaidAccess();

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge>Developer tool for precision-safe math</Badge>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Stop floating-point bugs before they hit money, science, or production data.
            </h1>
            <p className="max-w-xl text-lg text-zinc-300">
              FloatSafe Compare gives backend teams deterministic floating-point comparisons with tuned
              tolerances, ULP-aware analysis, and generated helper functions you can ship in minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a
                  href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy Pro Access ($5/mo)
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={paidAccess ? "/compare" : "/purchase/success"}>
                  {paidAccess ? "Open Comparator" : "Unlock My Access"}
                </Link>
              </Button>
            </div>
            <p className="text-sm text-zinc-400">
              Hosted checkout via Stripe Payment Link. No card data touches your app.
            </p>
          </div>

          <Card className="border-[#335089] bg-[#0f172b]">
            <CardHeader>
              <CardTitle className="text-xl">The costly mistake teams keep shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-300">
              <div className="rounded-xl border border-[#31405f] bg-[#0b1220] p-4 font-mono text-sm">
                <p>if (balanceDelta === 0.3) {'{'} settle(); {'}'}</p>
                <p className="mt-2 text-rose-300">// Fails when delta is 0.30000000000000004</p>
              </div>
              <p>
                That one line has broken invoice settlement, payout triggers, and scientific thresholds.
                FloatSafe Compare replaces naive checks with robust comparison semantics tuned to your
                domain risk.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldAlert className="h-4 w-4 text-rose-300" />
              Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-300">
            Binary floating-point rounding causes false mismatches and threshold errors that cascade into
            financial misstatements and unstable models.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code2 className="h-4 w-4 text-sky-300" />
              Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-300">
            Compare numbers using absolute+relative tolerances and ULP checks, visualize drift, and
            generate hardened code snippets in your target language.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet2 className="h-4 w-4 text-emerald-300" />
              Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-300">
            Reduce production incidents, eliminate reconciliation noise, and ship precision-sensitive logic
            with confidence for just $5/month.
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="border-[#31588c] bg-[#0f172b]">
          <CardHeader>
            <CardTitle className="text-2xl">Simple pricing for precision-critical teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-4xl font-bold text-white">$5<span className="text-lg text-zinc-400">/mo</span></p>
                <p className="mt-2 text-zinc-300">
                  One seat. Full compare workspace, visual diagnostics, and code generation.
                </p>
              </div>
              <Button asChild size="lg">
                <a
                  href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Pro with Stripe Checkout
                </a>
              </Button>
            </div>
            <ul className="mt-6 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Safe comparator with NaN/Infinity and ULP handling
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Precision drift visualizer for cumulative error analysis
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Code generation for 8 backend languages
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Cookie-based paywall unlock after Stripe checkout
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <Card key={item.question}>
              <CardHeader>
                <CardTitle className="text-base">{item.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-300">{item.answer}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
