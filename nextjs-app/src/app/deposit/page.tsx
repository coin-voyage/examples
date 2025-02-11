import DepositFunds from "../_components/deposit"

export default function DepositPage() {
  return (
    <div className="bg-gray-50">
      <div className="p-8 max-w-sm flex flex-col gap-4">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-lg font-medium text-gray-900">Deposit Funds</h2>
          <div className="text-sm text-gray-500">Make a deposit into your sui account.</div>
        </div>
        <DepositFunds />
      </div>
    </div>
  )
}