import { useState, useEffect } from "react";
import { Home, FileText, BookOpen, User, Settings } from "lucide-react"; // Importe os ícones desejados

export function useNavItems() {
  const [userRole, setUserRole] = useState("aluno");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserRole = localStorage.getItem("userRole");
      if (storedUserRole) {
        setUserRole(storedUserRole);
      }
    }
  }, []);

  const communNavItems = [
    { name: "Settings", href: "/settings", icon: <Settings /> },
  ];

  const navItems = [
    ...(userRole === "professor"
      ? [
          { name: "Dashboard", href: "/dashboard", icon: <Home /> },
          { name: "Questões", href: "/questions", icon: <FileText /> },
        ]
      : []),
    ...(userRole === "aluno"
      ? [
          { name: "Questões", href: "/solve", icon: <BookOpen /> },
          { name: "Progresso", href: "/profile", icon: <User /> },
        ]
      : []),
  ];

  return { navItems };
}
