import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaywallNoticeProps {
  title: string;
  description: string;
}

export function PaywallNotice({ title, description }: PaywallNoticeProps) {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-300">
          Pro access includes the interactive comparator, precision visualizer, and language code generator.
          After checkout, configure your Stripe Payment Link to redirect to
          <span className="mx-1 rounded bg-[#1f2937] px-1.5 py-0.5 font-mono text-xs text-zinc-200">
            {"/purchase/success?session_id={CHECKOUT_SESSION_ID}"}
          </span>
          so the access cookie can be issued automatically.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!}
              target="_blank"
              rel="noreferrer"
            >
              Buy Pro Access ($5/mo)
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/purchase/success">I already purchased</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
