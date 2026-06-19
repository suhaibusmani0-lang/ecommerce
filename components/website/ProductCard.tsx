"use client";

import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { type Product, formatPrice } from "@/lib/data";
import { addToCart } from "@/store/reducer/cartReducer";

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-[#F1EBE1]" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-[9px] sm:text-[10px] tracking-widest uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-semibold
            ${product.badge === "Sale" ? "bg-[#C17A56] text-white" : "bg-[#1A1A1A] text-white"}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 hover:bg-white rounded-full p-1 sm:p-1.5 transition-colors shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart size={12} className={`sm:w-[14px] sm:h-[14px] ${wished ? "fill-[#C17A56] text-[#C17A56]" : "text-[#1A1A1A]"}`} />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 right-0 text-[10px] sm:text-xs tracking-widest uppercase text-center py-2.5 sm:py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300 font-semibold
            ${added ? "bg-[#C17A56] text-white" : "bg-[#1A1A1A] text-white hover:bg-[#C17A56]"}`}
        >
          {added ? (
            <span className="flex items-center justify-center gap-1"><Check size={12} /> Added</span>
          ) : "Quick Add"}
        </button>
      </div>

      <div className="mt-2 sm:mt-3 px-0.5">
        <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8B6F52]">{product.category}</p>
        <p className="text-xs sm:text-sm text-[#1A1A1A] mt-0.5 font-medium leading-snug line-clamp-1">{product.name}</p>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-[#8B6F52] line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
