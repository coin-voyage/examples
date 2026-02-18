import { PayOrderEvent } from "@coin-voyage/paykit/types";
import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

const webhookSecret = process.env.COIN_VOYAGE_WEBHOOK_SECRET!;

function verifySignature(rawBody: string, signature: string): boolean {
  const expected = createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("base64");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export const POST = async (request: NextRequest) => {
  const rawBody = await request.text();
  const signature = request.headers.get("CoinVoyage-Webhook-Signature");

  if (!signature || !verifySignature(rawBody, signature)) {
    return new Response("Unauthorized", { status: 401 });
  }

  let event: PayOrderEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  if (!("payorder_id" in event)) {
    return new Response("OK", { status: 200 });
  }

  try {
    switch (event.type) {
      case "payorder_completed": {
        // Handle completed event;
        break;
      }
      default:
        break;
    }
  } catch (error: any) {
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};
