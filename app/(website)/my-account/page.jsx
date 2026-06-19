"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, ShoppingBag, MapPin, Settings, LogOut, Package, Heart, CreditCard, ChevronRight, Edit2, Check } from "lucide-react";
import { logout } from "@/store/reducer/authReducer";
import { persistor } from "@/store/store";
import { RootState } from "@/store/store";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.authStore.auth);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(logout());
    await persistor.purge();
    window.location.href = "/";
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const mockOrders = [
    { id: "ORD-2024-001", date: "2024-01-15", status: "Delivered", total: "₹4,599", items: 3 },
    { id: "ORD-2024-002", date: "2024-02-20", status: "Shipped", total: "₹2,899", items: 2 },
    { id: "ORD-2024-003", date: "2024-03-10", status: "Processing", total: "₹7,250", items: 5 },
  ];

  const mockAddresses = [
    { id: 1, type: "Home", name: "John Doe", address: "123 Main Street, Apt 4B", city: "Mumbai", state: "Maharashtra", pincode: "400001", phone: "+91 98765 43210", default: true },
    { id: 2, type: "Office", name: "John Doe", address: "456 Business Park, Tower A", city: "Mumbai", state: "Maharashtra", pincode: "400051", phone: "+91 98765 43210", default: false },
  ];

  const mockWishlist = [
    { id: 1, name: "Premium Cotton Shirt", price: "₹1,299", image: "/api/placeholder/200/200", inStock: true },
    { id: 2, name: "Slim Fit Chinos", price: "₹1,899", image: "/api/placeholder/200/200", inStock: false },
    { id: 3, name: "Leather Belt", price: "₹799", image: "/api/placeholder/200/200", inStock: true },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-wide">My Account</h1>
          <p className="text-[#1A1A1A]/60 mt-2">Welcome back, {auth?.name || "User"}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C17A56] flex items-center justify-center text-white font-bold text-lg">
                  {auth?.name?.[0] || "U"}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{auth?.name || "User"}</p>
                  <p className="text-xs text-[#1A1A1A]/60">{auth?.email || "user@example.com"}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-[#C17A56] text-white"
                          : "text-[#1A1A1A]/70 hover:bg-gray-50 hover:text-[#1A1A1A]"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium tracking-wide">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium tracking-wide">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1A1A1A]">Profile Information</h2>
                  <button className="flex items-center gap-2 text-[#C17A56] hover:text-[#A06245] transition-colors">
                    <Edit2 size={16} />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Full Name</label>
                    <p className="text-[#1A1A1A] font-medium">{auth?.name || "John Doe"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Email Address</label>
                    <p className="text-[#1A1A1A] font-medium">{auth?.email || "john@example.com"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Phone Number</label>
                    <p className="text-[#1A1A1A] font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Date of Birth</label>
                    <p className="text-[#1A1A1A] font-medium">January 15, 1990</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Gender</label>
                    <p className="text-[#1A1A1A] font-medium">Male</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C17A56] focus:ring-2 focus:ring-[#C17A56]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A]/60 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C17A56] focus:ring-2 focus:ring-[#C17A56]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-3 bg-[#C17A56] text-white rounded-xl font-medium hover:bg-[#A06245] transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Order History</h2>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:border-[#C17A56]/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Package size={20} className="text-[#C17A56]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#1A1A1A]">{order.id}</p>
                            <p className="text-sm text-[#1A1A1A]/60">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-semibold text-[#1A1A1A]">{order.total}</p>
                            <p className="text-sm text-[#1A1A1A]/60">{order.items} items</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered" ? "bg-green-100 text-green-700" :
                              order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status}
                            </span>
                            <ChevronRight size={16} className="text-[#1A1A1A]/40" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1A1A1A]">Saved Addresses</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#C17A56] text-white rounded-xl font-medium hover:bg-[#A06245] transition-colors">
                    <MapPin size={16} />
                    <span className="text-sm">Add New</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAddresses.map((address) => (
                    <div key={address.id} className="border border-gray-100 rounded-xl p-4 hover:border-[#C17A56]/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-[#1A1A1A]">{address.type}</span>
                          {address.default && (
                            <span className="flex items-center gap-1 text-xs text-[#C17A56]">
                              <Check size={12} />
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-[#1A1A1A]/40 hover:text-[#C17A56] transition-colors">
                          <Edit2 size={16} />
                        </button>
                      </div>
                      <p className="font-medium text-[#1A1A1A]">{address.name}</p>
                      <p className="text-sm text-[#1A1A1A]/70 mt-1">{address.address}</p>
                      <p className="text-sm text-[#1A1A1A]/70">{address.city}, {address.state} - {address.pincode}</p>
                      <p className="text-sm text-[#1A1A1A]/70 mt-1">{address.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">My Wishlist</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-[#C17A56]/30 transition-colors group">
                      <div className="aspect-square bg-gray-50 relative">
                        <div className="w-full h-full flex items-center justify-center text-[#1A1A1A]/20">
                          <Package size={48} />
                        </div>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart size={16} className="text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[#1A1A1A] text-sm">{item.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-semibold text-[#C17A56]">{item.price}</p>
                          <span className={`text-xs ${item.inStock ? "text-green-600" : "text-red-500"}`}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <button
                          disabled={!item.inStock}
                          className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            item.inStock
                              ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                        <CreditCard size={20} className="text-[#C17A56]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">Payment Methods</p>
                        <p className="text-sm text-[#1A1A1A]/60">Manage your saved cards</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[#1A1A1A]/40" />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                        <MapPin size={20} className="text-[#C17A56]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">Shipping Preferences</p>
                        <p className="text-sm text-[#1A1A1A]/60">Default shipping address</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[#1A1A1A]/40" />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                        <Settings size={20} className="text-[#C17A56]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">Notification Settings</p>
                        <p className="text-sm text-[#1A1A1A]/60">Email and push notifications</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[#1A1A1A]/40" />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                        <User size={20} className="text-[#C17A56]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">Privacy Settings</p>
                        <p className="text-sm text-[#1A1A1A]/60">Data and privacy controls</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[#1A1A1A]/40" />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Danger Zone</h3>
                  <button className="px-6 py-3 border border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}