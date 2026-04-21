import { NextResponse } from "next/server";

import { ACCESS_COOKIE_NAME, accessCookieOptions, signAccessPayload } from "@/lib/auth";
import { findPaidSession, markSessionRedeemed } from "@/lib/purchase-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id")?.trim();

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required." }, { status: 400 });
  }

  const session = await findPaidSession(sessionId);
  if (!session) {
    return NextResponse.json(
      {
        error:
          "No paid checkout session found yet. Confirm webhook delivery for checkout.session.completed."
      },
      { status: 404 }
    );
  }

  const token = signAccessPayload({
    sessionId,
    email: session.customerEmail,
    grantedAt: new Date().toISOString(),
    plan: "pro"
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set(ACCESS_COOKIE_NAME, token, accessCookieOptions);

  await markSessionRedeemed(sessionId);

  return response;
}
