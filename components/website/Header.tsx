"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/reducer/authReducer";
import { persistor } from "@/store/store";
import type { RootState } from "@/store/store";
import CartDrawer from "./CartDrawer";

const navLinks = ["Women", "Men", "Living", "Bedroom", "Accessories", "Kitchen", "Sale"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => s.authStore.auth) as any;
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((sum, i) => sum + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || cartOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, cartOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(logout());
    await persistor.purge();
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-[#1A1A1A] transition-shadow ${scrolled ? "shadow-lg" : ""}`}>
        {/* Announcement */}
        <div className="hidden sm:block bg-[#C17A56] text-white text-center text-[10px] sm:text-xs tracking-widest uppercase py-1.5 px-4">
          Free shipping on orders above ₹2,999 &nbsp;·&nbsp; Easy 30-day returns
        </div>

        {/* Main bar */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-14 sm:h-16">

          {/* Hamburger */}
          <button className="lg:hidden text-white/80 hover:text-white p-1 -ml-1" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 text-white text-base sm:text-lg md:text-xl tracking-[0.25em] uppercase font-bold shrink-0">
            CX Store
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="text-white/75 hover:text-white text-[11px] tracking-widest uppercase transition-colors">
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden sm:block text-white/80 hover:text-white transition-colors" aria-label="Search">
              <Search size={17} />
            </button>

            {/* Auth-aware account */}
            {auth ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href={auth.role === "admin" ? "/admin/dashboard" : "/my-account"} className="text-white/80 hover:text-white transition-colors text-[11px] tracking-widest uppercase">
                  {auth.name?.split(" ")[0]}
                </Link>
                <button onClick={handleLogout} className="text-white/60 hover:text-white transition-colors" aria-label="Logout">
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="hidden sm:block text-white/80 hover:text-white transition-colors" aria-label="Account">
                <User size={17} />
              </Link>
            )}

            {/* Mobile account icon */}
            <Link href={auth ? (auth.role === "admin" ? "/admin/dashboard" : "/my-account") : "/auth/login"} className="sm:hidden text-white/80 hover:text-white transition-colors">
              <User size={17} />
            </Link>

            <button className="hidden sm:block text-white/80 hover:text-white transition-colors" aria-label="Wishlist">
              <Heart size={17} />
            </button>

            {/* Cart with live count */}
            <button onClick={() => setCartOpen(true)} className="relative text-white/80 hover:text-white transition-colors" aria-label="Cart">
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C17A56] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div onClick={() => setMobileOpen(false)} className={`fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ background: "rgba(0,0,0,0.5)" }} />
      <div className={`fixed top-0 left-0 z-[70] h-full w-[80vw] max-w-[320px] bg-[#1A1A1A] flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-white text-base tracking-[0.25em] uppercase font-bold">CX Store</span>
          <button onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white"><X size={22} /></button>
        </div>
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/5 text-sm tracking-widest uppercase py-3 px-2 rounded transition-colors">
              {link}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-6 border-t border-white/10 flex items-center justify-between">
          {auth ? (
            <>
              <Link href={auth.role === "admin" ? "/admin/dashboard" : "/my-account"} onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white flex items-center gap-2 text-xs tracking-widest uppercase">
                <User size={15} /> {auth.name?.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="text-white/60 hover:text-white flex items-center gap-2 text-xs tracking-widest uppercase">
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white flex items-center gap-2 text-xs tracking-widest uppercase">
              <User size={15} /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
