"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import getStripe from "@/lib/stripe-configs/get-stripejs";

interface CheckoutClientProps {
  clientSecret: string | null;
}

export default function CheckoutClient({ clientSecret }: CheckoutClientProps) {
  if (!clientSecret) return null;
  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4 bg-white border border-gray-100 rounded-2xl shadow-xs">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
