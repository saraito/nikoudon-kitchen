import type { Metadata } from "next";
import "./globals.css";
import TabNav from "@/components/TabNav";
import { EditModeProvider, EditModeToggle } from "@/components/EditMode";

export const metadata: Metadata = {
  title: "Niko Udon — Kitchen",
  description: "Kitchen reference app for Niko Udon staff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-ink">
        <EditModeProvider>
          <header className="border-b border-black px-4 py-3 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">NIKO UDON</span>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-gray-500">Kitchen</span>
              <EditModeToggle />
            </div>
          </header>
          <main className="flex-1 pb-20 max-w-2xl w-full mx-auto">{children}</main>
          <TabNav />
        </EditModeProvider>
      </body>
    </html>
  );
}
