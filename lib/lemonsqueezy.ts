import crypto from "node:crypto";

export interface PaymentWebhookEvent {
  type: string;
  data?: {
    object?: {
      id?: string;
      customer_details?: {
        email?: string;
      };
      customer_email?: string;
    };
  };
}

function parseSignatureHeader(signatureHeader: string): {
  timestamp: string;
  signatures: string[];
} {
  const parts = signatureHeader.split(",").map((part) => part.trim());
  let timestamp = "";
  const signatures: string[] = [];

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "t") {
      timestamp = value;
    }
    if (key === "v1") {
      signatures.push(value);
    }
  }

  return { timestamp, signatures };
}

export function verifyStripeStyleSignature(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string
): boolean {
  if (!signatureHeader || !webhookSecret) {
    return false;
  }

  const { timestamp, signatures } = parseSignatureHeader(signatureHeader);
  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload)
    .digest("hex");

  return signatures.some((signature) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    } catch {
      return false;
    }
  });
}

export function parseWebhookEvent(rawBody: string): PaymentWebhookEvent | null {
  try {
    return JSON.parse(rawBody) as PaymentWebhookEvent;
  } catch {
    return null;
  }
}

export function extractCompletedSession(event: PaymentWebhookEvent): {
  sessionId: string;
  customerEmail?: string;
} | null {
  if (event.type !== "checkout.session.completed") {
    return null;
  }

  const object = event.data?.object;
  const sessionId = object?.id;

  if (!sessionId) {
    return null;
  }

  return {
    sessionId,
    customerEmail: object.customer_details?.email || object.customer_email
  };
}
