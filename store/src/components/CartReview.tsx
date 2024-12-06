"use client";

import { useTicketStore } from "@/store/ticketStore";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/lib/context";

export function CartReview() {
  // const { tickets, incrementQuantity, decrementQuantity, clearTickets } =
  //   useTicketStore();
  const [total, setTotal] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const newTotal = cart.reduce((acc: number, item: any) => acc + (item.discount ? (100 - item.discount) / 100 : 1) * item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  }

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm"
      role="region"
      aria-label="Shopping Cart"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Cart Review</h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
            {cart.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
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
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="text-xl font-bold text-[#099C77]">
                ${total > 0 ? total.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
