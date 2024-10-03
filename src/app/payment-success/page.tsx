import Link from "next/link";

type ConfirmPaymentSuccessProp = {
  searchParams: { amount: string }
}

export default function ConfirmPaymentSuccess({
  searchParams: { amount }
}: ConfirmPaymentSuccessProp) {
  return (
    <main className="max-w-3xl mx-auto p-10 text-white m-10 text-center rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-3">Thank you!</h1>
        <h2 className="text-xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-3xl font-semibold">
          ${amount}
        </div>
      </div>

      <Link href={'/'} className="p-2 bg-black rounded-lg">Back to homepage</Link>

    </main>
  );
}