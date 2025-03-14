import { useState, useEffect } from "react";
import {
  Home,
  FileText,
  BookOpen,
  User,
  Settings,
  Paperclip,
} from "lucide-react"; // Importe os ícones desejados

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

  const commonNavItems = [
    { name: "Provas", href: "/prova", icon: <Paperclip /> },
  ];

  const navItems = [
    ...(userRole === "professor"
      ? [
          ...commonNavItems,
          { name: "Dashboard", href: "/dashboard", icon: <Home /> },
          { name: "Questões", href: "/questoes", icon: <FileText /> },
        ]
      : []),
    ...(userRole === "aluno"
      ? [
          ...commonNavItems,
          { name: "Progresso", href: "/perfil", icon: <User /> },
        ]
      : []),
  ];

  return { navItems };
}
