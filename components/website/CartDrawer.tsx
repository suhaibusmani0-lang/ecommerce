"use client";

import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { removeFromCart, updateQty, clearCart, type CartItem } from "@/store/reducer/cartReducer";
import { formatPrice } from "@/lib/data";
import type { RootState } from "@/store/store";
import Link from "next/link";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useDispatch();
  const items: CartItem[] = useSelector((s: RootState) => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[80] bg-black/50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-[90] h-full w-full max-w-[400px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3D9C9]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#1A1A1A]" />
            <span className="text-sm tracking-widest uppercase font-semibold text-[#1A1A1A]">
              Cart ({items.reduce((s, i) => s + i.qty, 0)})
            </span>
          </div>
          <button onClick={onClose} className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]"><X size={20} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-[#E3D9C9]" />
              <p className="text-sm text-[#8B6F52]">Your cart is empty</p>
              <button onClick={onClose} className="text-xs tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg bg-[#F1EBE1] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-widest uppercase text-[#8B6F52]">{item.category}</p>
                  <p className="text-sm font-medium text-[#1A1A1A] leading-snug line-clamp-1">{item.name}</p>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => item.qty === 1 ? dispatch(removeFromCart(item.id)) : dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                      className="w-6 h-6 rounded-full border border-[#E3D9C9] flex items-center justify-center hover:bg-[#F1EBE1] transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                      className="w-6 h-6 rounded-full border border-[#E3D9C9] flex items-center justify-center hover:bg-[#F1EBE1] transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-auto text-[#8B6F52] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E3D9C9] px-5 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest uppercase text-[#8B6F52]">Subtotal</span>
              <span className="text-base font-semibold text-[#1A1A1A]">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[10px] text-[#8B6F52] text-center">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-[#1A1A1A] text-white text-xs tracking-widest uppercase text-center py-3.5 hover:bg-[#C17A56] transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="block w-full text-center text-xs tracking-widest uppercase text-[#8B6F52] hover:text-[#1A1A1A] transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
