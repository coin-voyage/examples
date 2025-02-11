import { PayButton } from "@coin-voyage/paykit";
import { Skeleton } from "./skeleton";

export default function PayCrypto({
    payId,
    isLoading,
}: {
    payId?: string
    isLoading: boolean,
}) {
    if (isLoading) {
        return (
            <Skeleton className="w-full h-[50px]" />
        );
    }

    if (!payId) {
        return (
            <div className="text-red-500">Failed to create payment intent</div>
        );
    }

    return (
        <PayButton.Custom
            payId={payId}
            children={
                ({ show, hide }) => (
                    <button
                        onClick={show}
                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                        Pay With Crypto
                    </button>
                )}
        />
    )
}