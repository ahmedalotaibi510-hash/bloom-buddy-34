import { createServerFn } from "@tanstack/react-start";

type CartLine = {
  name: string;
  /** amount in fils (1 KD = 1000 fils) */
  amount: number;
  quantity: number;
};

const CART: CartLine[] = [
  { name: "Heritage Leather Album", amount: 45000, quantity: 1 },
  { name: "Walnut Keepsake Box", amount: 32500, quantity: 1 },
];

const SHIPPING = { name: "Shipping", amount: 2000, quantity: 1 };

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((input: { origin: string }) => {
    if (!input || typeof input.origin !== "string" || !/^https?:\/\//.test(input.origin)) {
      throw new Error("Invalid request.");
    }
    return { origin: input.origin };
  })
  .handler(async ({ data }) => {
    const secretKey = process.env["STRIPE_TEST_API_KEY"];
    if (!secretKey) {
      return { url: null, error: "Payments are not configured yet." };
    }

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", `${data.origin}/track?paid=1`);
    body.set("cancel_url", `${data.origin}/checkout?canceled=1`);

    // The Stripe account cannot settle KWD, so charge the USD equivalent.
    const USD_PER_KD = 3.25;
    const toUsdCents = (fils: number) => Math.round((fils / 1000) * USD_PER_KD * 100);

    [...CART, SHIPPING].forEach((line, i) => {
      body.set(`line_items[${i}][quantity]`, String(line.quantity));
      body.set(`line_items[${i}][price_data][currency]`, "usd");
      body.set(`line_items[${i}][price_data][unit_amount]`, String(toUsdCents(line.amount)));
      body.set(`line_items[${i}][price_data][product_data][name]`, line.name);
    });

    try {
      const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const json = (await res.json()) as { url?: string; error?: { message?: string } };
      if (!res.ok || !json.url) {
        console.error("Stripe checkout session failed", res.status, json.error?.message);
        return { url: null, error: "We could not start the payment. Please try again." };
      }
      return { url: json.url, error: null };
    } catch (err) {
      console.error("Stripe request error", err);
      return { url: null, error: "We could not reach the payment service. Please try again." };
    }
  });
