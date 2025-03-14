import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full justify-between px-4 pt-1">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold">Quest Lab</span>
        </Link>
        <nav className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/registrar">
            <Button size="sm">Cadastrar</Button>
          </Link>
        </nav>
      </header>
      <main className="flex  flex-col flex-1 justify-center">
        <section className="flex flex-col items-center justify-center space-y-4 text-center w-full py-12 md:py-24 lg:py-32">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Bem-vindo ao Quest Lab
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Plataforma educacional para criação, distribuição e avaliação de
              questões
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/registrar">
              <Button size="lg">Começar agora</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Já tenho uma conta
              </Button>
            </Link>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-4 md:px-6 flex justify-center">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Para Professores</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Crie questões, organize por categorias e acompanhe o
                  desempenho dos alunos
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Para Alunos</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Responda questões, receba feedback imediato e acompanhe seu
                  progresso
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Gestão Simplificada</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Interface intuitiva para gerenciar usuários, questões e
                  resultados
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Quest Lab. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
