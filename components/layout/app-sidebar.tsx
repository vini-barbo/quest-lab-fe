"use client";

import Link from "next/link";
import { useNavItems } from "./app-hook-links";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Menu, Settings } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const { navItems } = useNavItems();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/");
  };

  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("usuario@example.com");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
      setUserRole(localStorage.getItem("userRole") || "aluno");
      setUserName(localStorage.getItem("userName") || "Usuario");
      setUserEmail(localStorage.getItem("userEmail") || "usuario@example.com");
    }
  }, []);

  return (
    <aside className="md:h-full md:bg-primary  md:sticky ">
      <nav className=" flex justify-between items-center bg-primary px-2 py-4 md:hidden">
        <Sheet>
          <SheetTrigger
            asChild
            className="md:hidden hover:!text-primary !bg-transparent  hover:!bg-white !text-white "
          >
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary !text-white  rounded">
            <SheetHeader className="mb-4">
              <SheetTitle className="!text-white">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex gap-1 hover:!text-primary  hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors hover:text-foreground/80 ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
                >
                  {item.name}
                  {item.icon}
                </Link>
              ))}
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  className="justify-start px-2"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              )}
              <hr />
              <Link
                href="/configuracao"
                className="flex gap-1 hover:!text-primary  hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors"
              >
                Opções
                <Settings />
              </Link>
              <Link
                href="/"
                className="flex gap-1  p-2
                hover:!text-primary  hover:!bg-white !text-white
              items-center
              rounded
              justify-between text-sm font-medium transition-colors"
              >
                Sair
                <LogOutIcon />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href={"/configuracao"}
          className={`flex gap-1 hover:!text-primary  bg-primary hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors hover:text-foreground/80 `}
        >
          <div className="flex gap-2 items-center ">
            <Image
              src="https://avatars.githubusercontent.com/u/62946143?v=4"
              alt="Quest Lab Icon"
              width={40}
              height={40}
              className="h-10 aspect-square rounded-full"
            />
            <div>
              <h1 className="text-base ">{userName}</h1>
              <h2 className="text-gray-300 text-sm ">{userRole}</h2>
            </div>
          </div>
        </Link>
      </nav>
      <hr className="md:hidden" />
      <nav className="flex-col gap-2 h-full justify-between hidden md:!flex  px-2 py-4 sticky">
        <section className="flex flex-col gap-2">
          <Link
            href={"/configuracao"}
            className={`flex gap-1 !text-white rounded p-y w-full
              items-center
              justify-between text-sm font-medium transition-colors`}
          >
            <div className="flex gap-2 w-full justify-between px-2">
              <Image
                src="https://avatars.githubusercontent.com/u/62946143?v=4"
                alt="Quest Lab Icon"
                width={40}
                height={40}
                className="h-10 aspect-square rounded-full"
              />
              <div>
                <h1 className="text-base">{userName}</h1>
                <h2 className="text-gray-300 text-sm text-clip">{userRole}</h2>
              </div>
            </div>
          </Link>

          <hr />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-1 hover:!text-primary  hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors hover:text-foreground/80 ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {item.name}
              {item.icon}
            </Link>
          ))}
        </section>
        <section className="flex flex-col gap-2">
          <hr />
          <Link
            href="/configuracao"
            className="flex gap-1 hover:!text-primary  hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors"
          >
            Opções
            <Settings />
          </Link>
          <Link
            href="/"
            className="flex gap-1 hover:!text-primary  hover:!bg-white !text-white rounded p-2
              items-center
              justify-between text-sm font-medium transition-colors"
          >
            Sair
            <LogOutIcon />
          </Link>
        </section>
      </nav>
    </aside>
  );
}
