import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey) : null;

export type CheckoutItem = { name: string; amount: number; quantity: number };

export async function createCheckoutSession(params: {
  items: CheckoutItem[];
  userEmail: string;
  userId: string;
  userName: string;
  metadata?: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    throw new Error("Stripe is not configured. Add STRIPE_SECRET_KEY to your environment variables.");
  }

  const lineItems = params.items.map((item) => ({
    price_data: {
      currency: "aud",
      product_data: { name: item.name },
      unit_amount: item.amount,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems as any,
      mode: "payment",
      customer_email: params.userEmail,
      client_reference_id: params.userId,
      metadata: {
        user_id: params.userId,
        customer_email: params.userEmail,
        customer_name: params.userName,
        ...(params.metadata ?? {}),
      },
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      allow_promotion_codes: true,
    });

    return session;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
}
