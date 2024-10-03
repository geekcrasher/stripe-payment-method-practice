"use client"

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type CheckoutFormProp = {
  amount: number,
}


const CheckoutForm = ({ amount }: CheckoutFormProp) => {

  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')


  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) return;

    setIsLoading(true)

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setIsLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`
      }
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false)

  }

  if (!(clientSecret || stripe || elements)) {
    return (
      <div className="flex items-center justify-center gap-2">
        <LoaderCircle className="w-6 h-6 text-white animate-spin" />
        <span className="text-xl font-medium">Loading...</span>
      </div>
    )
  }

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-4"
      >
        {clientSecret && <PaymentElement />}

        {errorMessage && <div id="payment-message">{errorMessage}</div>}

        <Button
          id="submit"
          disabled={isLoading || !stripe || !elements}
          className="mt-8 w-full disabled:opacity-75 disabled:animate-pulse">
          <span>
            {!isLoading ? `Pay $${amount}` : (
              <div className="flex items-center gap-2">
                <LoaderCircle className="w-5 h-5 text-white animate-spin" />
                Processing...
              </div>
            )}
          </span>
        </Button>

      </form>
    </>
  );
}

export default CheckoutForm;