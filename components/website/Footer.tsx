"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

const links = {
  Shop: ["Women", "Men", "Living", "Bedroom", "Accessories", "Sale"],
  Help: ["Track Order", "Returns & Exchanges", "Shipping Info", "Size Guide", "Contact Us"],
  Company: ["About Us", "Sustainability", "Careers", "Press", "Privacy Policy"],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#1A1A1A] text-white">

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-serif mb-1">Stay in the Loop</h3>
            <p className="text-xs sm:text-sm text-white/60">New arrivals, exclusive offers — straight to your inbox.</p>
          </div>
          <form
            className="flex w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-white/10 text-white placeholder:text-white/40 text-xs sm:text-sm px-4 py-3 outline-none flex-1 md:w-64 lg:w-72 border border-white/20 min-w-0"
            />
            <button
              type="submit"
              className="bg-[#C17A56] hover:bg-[#a8663f] px-4 py-3 transition-colors shrink-0"
              aria-label="Subscribe"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Links grid — 2-col on mobile, 4-col on md+ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-base sm:text-lg tracking-[0.2em] uppercase font-bold mb-3">CX Store</p>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-[220px]">
            A curated blend of fashion and home — crafted for the way you live.
          </p>
          <div className="flex gap-4 mt-5">
            {[FaInstagram, FaXTwitter, FaFacebookF].map((Icon, i) => (
              <a key={i} href="#" className="text-white/50 hover:text-[#C17A56] transition-colors">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <p className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold mb-3 sm:mb-4 text-white/80">{title}</p>
            <ul className="space-y-2 sm:space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-white/40">
          <p>© {new Date().getFullYear()} CX Store. All rights reserved.</p>
          <div className="flex gap-4">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
