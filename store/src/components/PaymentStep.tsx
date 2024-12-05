"use client";

import { useTicketStore } from "@/store/ticketStore";
import PaymentWidget from "@requestnetwork/payment-widget/react";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/layout";

export function PaymentStep() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const cleaCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc: number, item: any) => acc + ( item.discount ? (100 - item.discount) / 100 : 1) * item.price, 0);
    console.log("New total", newTotal);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div
        className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
        role="region"
        aria-label="Order Summary"
      >
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4">
          {Object.values(cart).map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
              </div>
              {
                item.discount ? (
                  <div className="flex items-center space-x-2">
                    <p className="line-through text-gray-400">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="font-medium text-[#099C77]">
                      ${(item.price * ((100 - item.discount) / 100)).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="font-medium text-[#099C77]">
                    ${item.price.toFixed(2)}
                  </p>
                )
              }
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-[#099C77]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Widget */}
      <div role="region" aria-label="Payment Widget">
        <h2 className="text-2xl font-semibold mb-6">Payment</h2>
        <PaymentWidget
          amountInUSD={total}
          sellerAddress={"0x2346ac3Bc15656D4dE1da99384B5498A75f128a2"}
          productInfo={{
            name: JSON.stringify({
              name: cart.map((item: any) => item.name).join(", "),
              description: cart.map((item: any) => item.description).join(", "),
              image: cart[0]?.image,
              tags: cart.map((item: any) => item.tags).join(", "),
            }),
            description: cart.map((item: any) => item.description).join(", "),
            image: cart[0]?.image,
          }}
          supportedCurrencies={[
            "ETH-sepolia-sepolia",
            "fUSDC-sepolia",
            "fUSDT-sepolia",
          ]}
          onPaymentSuccess={() => {
            console.log({
              name: cart.map((item: any) => item.name).join(", "),
              description: cart.map((item: any) => item.description).join(", "),
              image: cart[0]?.image,
            })

            cleaCart();

            // setTimeout(() => {
            //   router.push("/");
            // }, 5000);
          }}
          hideTotalAmount
          enablePdfReceipt={true}
          enableRequestScanLink={true}
        />
      </div>
    </div>
  );
}
