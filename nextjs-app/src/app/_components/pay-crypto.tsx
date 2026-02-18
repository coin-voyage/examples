import { PayButton } from "@coin-voyage/paykit";
import type { APIError } from "@coin-voyage/paykit/server";
import { Skeleton } from "./skeleton";

export default function PayCrypto({
    payId,
    isLoading,
    error,
}: {
    payId?: string
    isLoading: boolean,
    error: Error | null,
}) {
    if (isLoading) {
        return (
            <Skeleton className="w-full h-[50px]" />
        );
    }

    const parsedError = error ? JSON.parse(error.message) as APIError : null

    return (
        <PayButton.Custom
            payId={payId || ""}
            onPaymentStarted={(event) => {
                console.log("Payment started", event);
            }}
            onPaymentCompleted={(event) => {
                console.log("Payment completed", event);
            }}

            children={
                ({ show }) => (
                    <>
                        <button
                            onClick={show}
                            disabled={!payId}
                            className="w-full rounded-md border border-transparent bg-[#D9216E] disabled:bg-[#D9216E]/50 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#D9216E]/80 disabled:hover:bg-[#D9216E]/50 focus:outline-none focus:ring-2 focus:ring-[#D9216E]/50 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Pay With Crypto
                        </button>
                        {parsedError && <p className="text-red-500 text-sm mt-1">{parsedError.status}: {parsedError.message}</p>}
                        {!payId && !error && <p className="text-red-500 text-sm mt-1">Failed to create payment intent</p>}
                    </>
                )}
        />
    )
}