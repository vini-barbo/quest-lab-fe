import Link from "next/link";
import { BookOpen, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary/5 p-4">
      <div className="mb-8 flex items-center space-x-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-primary">Quest Lab</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary">
          404
        </h1>
        <div className="relative mb-4 mt-2">
          <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <h2 className="text-2xl font-bold tracking-tight">
            Página não encontrada
          </h2>
          <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
        <p className="mb-8 max-w-md text-muted-foreground">
          Ops! Parece que você tentou acessar uma página que não existe ou foi
          movida.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Página Inicial
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          Precisa de ajuda?{" "}
          <Link href="/support" className="text-primary hover:underline">
            Entre em contato com o suporte
          </Link>
        </p>
      </div>
    </div>
  );
}
