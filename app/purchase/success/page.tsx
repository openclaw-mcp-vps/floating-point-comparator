"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "failed">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const resolvedSessionId = searchParams.get("session_id");
    if (!resolvedSessionId) {
      setMessage(
        "No session_id was found in the URL. If you just paid, ensure your Stripe Payment Link success URL includes ?session_id={CHECKOUT_SESSION_ID}."
      );
      return;
    }
    const sessionId = resolvedSessionId;

    async function unlock() {
      setStatus("loading");
      const response = await fetch(`/api/access/grant?session_id=${encodeURIComponent(sessionId)}`);
      const payload = (await response.json()) as { success?: boolean; error?: string };

      if (response.ok && payload.success) {
        setStatus("granted");
        setMessage("Access unlocked. Your signed cookie is active in this browser.");
        return;
      }

      setStatus("failed");
      setMessage(
        payload.error ||
          "Access could not be granted yet. Confirm the webhook is configured and delivered checkout.session.completed events."
      );
    }

    void unlock();
  }, [searchParams]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unlock FloatSafe Compare</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-zinc-300">
          {status === "loading"
            ? "Verifying your checkout session and granting access..."
            : message ||
              "Complete payment through the Stripe link, then return here to activate your Pro tools."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/compare">Open Comparator</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/generate">Open Code Generator</Link>
          </Button>
        </div>
        <p className="text-xs text-zinc-500">
          Webhook endpoint to configure in Stripe: <span className="font-mono">/api/webhooks/lemonsqueezy</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Unlock FloatSafe Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300">Loading checkout session...</p>
            </CardContent>
          </Card>
        }
      >
        <PurchaseSuccessContent />
      </Suspense>
    </main>
  );
}
