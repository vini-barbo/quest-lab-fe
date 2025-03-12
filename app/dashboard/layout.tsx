import type React from "react"
import { AppHeader } from "@/components/app-header"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Nota: Em produção, esta verificação seria feita no servidor
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userRole = localStorage.getItem("userRole")

    if (!isLoggedIn) {
      redirect("/auth/login")
    }

    if (userRole !== "professor") {
      redirect("/solve")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}

