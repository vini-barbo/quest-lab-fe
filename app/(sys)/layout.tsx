import type React from "react";
import { AppHeader } from "@/components/layout/app-header";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn) {
      redirect("/auth/login");
    }

    if (userRole !== "professor") {
      redirect("/solve");
    }
  }

  return (
    <div className="">
      <main className="flex flex-col md:flex-row h-[100dvh] w-[100dvw] gap-2 overflow-y-scroll">
        <AppSidebar />
        <div className="w-full h-full overflow-scroll">{children}</div>
      </main>
    </div>
  );
}
