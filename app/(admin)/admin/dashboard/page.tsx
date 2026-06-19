"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { RootState } from "@/store/store";
import { ShoppingBag, Users, TrendingUp, Package, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹2,84,500", change: "+12.5%", icon: TrendingUp, color: "bg-[#C17A56]/10 text-[#C17A56]" },
  { label: "Total Orders", value: "1,284", change: "+8.2%", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { label: "Total Customers", value: "3,921", change: "+5.1%", icon: Users, color: "bg-green-50 text-green-600" },
  { label: "Total Products", value: "248", change: "+2.4%", icon: Package, color: "bg-purple-50 text-purple-600" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Aryan Sharma", product: "Linen Blazer", amount: "₹7,990", status: "Delivered" },
  { id: "#ORD-002", customer: "Priya Mehta", product: "Ceramic Vase Set", amount: "₹3,290", status: "Processing" },
  { id: "#ORD-003", customer: "Rohan Verma", product: "Leather Tote", amount: "₹9,990", status: "Shipped" },
  { id: "#ORD-004", customer: "Sneha Kapoor", product: "Merino Crewneck", amount: "₹5,490", status: "Pending" },
  { id: "#ORD-005", customer: "Vivek Nair", product: "Slim Chinos", amount: "₹3,990", status: "Delivered" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-600",
};

export default function AdminDashboard() {
  const auth = useSelector((s: RootState) => s.authStore.auth) as any;
  const router = useRouter();

  useEffect(() => {
    if (!auth) router.push("/auth/login");
    else if (auth.role !== "admin") router.push("/my-account");
  }, [auth, router]);

  if (!auth || auth.role !== "admin") return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {auth.name?.split(" ")[0]} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm text-gray-500 font-medium">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon size={16} />
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-0.5">
              <ArrowUpRight size={12} /> {s.change} this month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <button className="text-xs text-[#C17A56] hover:underline tracking-wide">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                {["Order ID", "Customer", "Product", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">{o.customer}</td>
                  <td className="px-5 py-3.5 text-gray-600">{o.product}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{o.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold tracking-wide ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logged in user info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Session Info</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Name", value: auth.name },
            { label: "Email", value: auth.email },
            { label: "Role", value: auth.role },
            { label: "Verified", value: auth.isEmailVerified ? "✅ Yes" : "❌ No" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
              <p className="font-medium text-gray-900 capitalize truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
