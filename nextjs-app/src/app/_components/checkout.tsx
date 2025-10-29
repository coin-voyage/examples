'use client'

import { PayOrder, PayOrderMetadata } from "@coin-voyage/paykit/types"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, Trash } from "lucide-react"
import React, { PropsWithChildren, useMemo } from "react"
import { createPayOrder } from "../../actions/pay-order"
import PayCrypto from "./pay-crypto"

type Prices = {
  subtotal: number
  taxes?: number
  shipping?: number
  total: number
}

const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: 32.0,
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
]

export default function Summary() {
  const [selectedProduct, setSelectedProduct] = React.useState({
    product: products[0],
    amount: 1,
  })

  const metadata: PayOrderMetadata = {
    items: [
      {
        name: selectedProduct.product.title,
        currency: "USD",
        description: `${selectedProduct.product.title} (${selectedProduct.product.color}), size: ${selectedProduct.product.size}`,
        image: selectedProduct.product.imageSrc,
        unit_price: selectedProduct.product.price,
        quantity: selectedProduct.amount,
      }]
  }

  const prices = useMemo(() => {
    const subtotal = Number(products.find((p) => p.id === selectedProduct.product.id)?.price) * selectedProduct.amount;
    const taxes = subtotal * 0.05;
    const shipping = 5;
    return {
      subtotal,
      taxes,
      shipping,
      total: subtotal + taxes + shipping
    } as Prices
  }, [selectedProduct])

  const { data: payOrder, isLoading, error } = useQuery<PayOrder | null>({
    queryKey: ["create-pay-order", JSON.stringify({ valueUsd: prices.total, metadata })],
    queryFn: async () => {
      const { data, error } = await createPayOrder({
        valueUsd: prices.total,
        metadata
      })
      if (error) {
        throw new Error(JSON.stringify(error))
      }

      return data || null
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  return (
    <OrderSummary
      prices={prices}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    >
      <PayCrypto isLoading={isLoading} payId={payOrder?.id} error={error} />
    </OrderSummary>
  )
}

function OrderSummary({
  prices,
  selectedProduct,
  setSelectedProduct,
  children,
}: PropsWithChildren<{
  prices: Prices
  selectedProduct: { product: typeof products[0]; amount: number },
  setSelectedProduct: React.Dispatch<React.SetStateAction<{ product: typeof products[0]; amount: number }>>
}>) {
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium">Order summary</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="flex px-4 py-6 sm:px-6">
              <div className="shrink-0">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="w-20 rounded-md"
                />
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a
                        href={product.href}
                        className="font-medium text-gray-700 hover:text-gray-800"
                      >
                        {product.title}
                      </a>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.size}
                    </p>
                  </div>

                  <div className="ml-4 flow-root shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove</span>
                      <Trash aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="ml-4">
                    <div className="grid grid-cols-1">
                      <select
                        id="quantity"
                        name="quantity"
                        value={selectedProduct.amount}
                        onChange={(e) => {
                          setSelectedProduct({
                            product,
                            amount: Number.parseInt(e.target.value),
                          })
                        }}
                        aria-label="Quantity"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(prices.subtotal)}
            </dd>
          </div>
          {prices.shipping && <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(prices.shipping)}
            </dd>
          </div>}
          {prices.taxes && <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(prices.taxes)}
            </dd>
          </div>}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(prices.total)}
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {children}
        </div>
      </div>
    </div>
  )
}

