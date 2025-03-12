"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Bell } from "lucide-react";

const questlabIcon = "/questlab/svg/logo-no-background.svg";

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");

    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/");
  };

  const navItems = [
    ...(userRole === "professor"
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Questões", href: "/questions" },
        ]
      : []),
    ...(userRole === "aluno"
      ? [
          { name: "Resolver Questões", href: "/solve" },
          { name: "Meu Progresso", href: "/profile" },
        ]
      : []),
  ];

  const [userName, setUserName] = useState("");

  return (
    <header className="w-full  !text-white bg-primary flex justify-between px-2 py-2">
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
        <SheetContent side="left">
          <SheetHeader className="mb-4">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {item.name}
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
          </nav>
        </SheetContent>
      </Sheet>

      <Link
        href={
          isLoggedIn
            ? userRole === "professor"
              ? "/dashboard"
              : "/solve"
            : "/"
        }
      >
        <Image
          src={questlabIcon}
          alt="Quest Lab Icon"
          width={200}
          height={100}
          className="h-11 aspect-video  object-cover  brightness-[100] saturate-0 hidden md:block"
        />
      </Link>

      <nav className="flex gap-2">
        <Button
          variant="link"
          className="hover:!text-primary  hover:!bg-white !text-white  rounded-full"
          size="icon"
        >
          <Bell />
        </Button>
        <div className="flex gap-2 items-center ">
          <Image
            src="https://avatars.githubusercontent.com/u/62946143?v=4"
            alt="Quest Lab Icon"
            width={40}
            height={40}
            className="h-10 aspect-square rounded-full"
          />
          <div>
            <h1 className="text-base">Nome</h1>
            <h2 className="text-gray-300 text-sm">Cargo</h2>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
    </header>

    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
    //   <div className="container flex h-14 items-center bg-primary">
    //     <div className="mr-4 flex md:mr-6">
    //       <Link
    //         href={
    //           isLoggedIn
    //             ? userRole === "professor"
    //               ? "/dashboard"
    //               : "/solve"
    //             : "/"
    //         }
    //         className="flex items-center space-x-2"
    //       >
    //         <BookOpen className="h-6 w-6" />
    //         <span className="hidden font-bold sm:inline-block">Quest Lab</span>
    //       </Link>
    //     </div>

    //     {/* Desktop Navigation */}
    //     <div className="hidden flex-1 md:flex">
    //       <nav className="flex items-center space-x-4 text-sm font-medium">
    //         {navItems.map((item) => (
    //           <Link
    //             key={item.href}
    //             href={item.href}
    //             className={`transition-colors hover:text-foreground/80 ${
    //               pathname === item.href
    //                 ? "text-foreground"
    //                 : "text-foreground/60"
    //             }`}
    //           >
    //             {item.name}
    //           </Link>
    //         ))}
    //       </nav>
    //     </div>

    //     {/* Mobile Navigation */}
    //     <Sheet>
    //       <SheetTrigger asChild className="md:hidden">
    //         <Button variant="outline" size="icon" className="mr-2">
    //           <Menu className="h-5 w-5" />
    //           <span className="sr-only">Toggle menu</span>
    //         </Button>
    //       </SheetTrigger>
    //       <SheetContent side="left">
    //         <SheetHeader className="mb-4">
    //           <SheetTitle>Menu</SheetTitle>
    //         </SheetHeader>
    //         <nav className="flex flex-col space-y-4">
    //           {navItems.map((item) => (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
    //                 pathname === item.href
    //                   ? "text-foreground"
    //                   : "text-foreground/60"
    //               }`}
    //             >
    //               {item.name}
    //             </Link>
    //           ))}
    //           {isLoggedIn && (
    //             <Button
    //               variant="ghost"
    //               className="justify-start px-2"
    //               onClick={handleLogout}
    //             >
    //               <LogOut className="mr-2 h-4 w-4" />
    //               Sair
    //             </Button>
    //           )}
    //         </nav>
    //       </SheetContent>
    //     </Sheet>

    //     <div className="flex flex-1 items-center justify-end space-x-2">
    //       {isLoggedIn ? (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" size="icon" className="rounded-full">
    //               <User className="h-5 w-5" />
    //               <span className="sr-only">Perfil do usuário</span>
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem asChild>
    //               <Link href="/profile">Perfil</Link>
    //             </DropdownMenuItem>
    //             <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       ) : (
    //         <>
    //           <Link href="/auth/login">
    //             <Button variant="ghost" size="sm">
    //               Entrar
    //             </Button>
    //           </Link>
    //           <Link href="/auth/register">
    //             <Button size="sm">Cadastrar</Button>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </header>
  );
}
