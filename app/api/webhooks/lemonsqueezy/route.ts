import { NextResponse } from "next/server";

import {
  extractCompletedSession,
  parseWebhookEvent,
  verifyStripeStyleSignature
} from "@/lib/lemonsqueezy";
import { upsertPaidSession } from "@/lib/purchase-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  const valid = verifyStripeStyleSignature(rawBody, signature, webhookSecret);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const event = parseWebhookEvent(rawBody);
  if (!event) {
    return NextResponse.json({ error: "Malformed webhook payload." }, { status: 400 });
  }

  const completed = extractCompletedSession(event);
  if (completed) {
    await upsertPaidSession(completed.sessionId, completed.customerEmail);
  }

  return NextResponse.json({ received: true });
}
