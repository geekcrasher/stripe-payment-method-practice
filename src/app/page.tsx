"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutForm from "@/components/CheckoutForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


export default function Home() {

  const amount = 49.99

  return (
    <main className="max-w-3xl mx-auto p-10 text-white m-10 text-center rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold">John Doe</h1>
        <h2 className="text-2xl ">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>


      <section>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "aud",
          }}
        >
          <CheckoutForm amount={amount} />
        </Elements>
      </section>
    </main>
  );
}
