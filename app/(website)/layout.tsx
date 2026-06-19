import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
