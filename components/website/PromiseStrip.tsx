import { Truck, RotateCcw, Leaf, ShieldCheck } from "lucide-react";

const promises = [
  { icon: Truck, title: "Free Shipping", sub: "On orders above ₹2,999" },
  { icon: RotateCcw, title: "Easy Returns", sub: "30-day hassle-free returns" },
  { icon: Leaf, title: "Sustainably Made", sub: "Responsible sourcing always" },
  { icon: ShieldCheck, title: "Secure Checkout", sub: "256-bit SSL encryption" },
];

export default function PromiseStrip() {
  return (
    <section className="bg-[#F1EBE1] border-y border-[#E3D9C9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {promises.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-2 sm:gap-3">
            <Icon size={18} className="text-[#C17A56] shrink-0 sm:w-[22px] sm:h-[22px]" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#1A1A1A] truncate">{title}</p>
              <p className="text-[10px] sm:text-xs text-[#8B6F52] mt-0.5 leading-tight">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
