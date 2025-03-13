"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockQuestions = [
  {
    id: 1,
    title: "Equação do segundo grau",
    category: "Matemática",
    difficulty: "Médio",
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "Análise sintática",
    category: "Português",
    difficulty: "Difícil",
    createdAt: "2023-10-12",
  },
  {
    id: 3,
    title: "Sistema solar",
    category: "Ciências",
    difficulty: "Fácil",
    createdAt: "2023-10-10",
  },
  {
    id: 4,
    title: "Segunda Guerra Mundial",
    category: "História",
    difficulty: "Médio",
    createdAt: "2023-10-08",
  },
  {
    id: 5,
    title: "Capitais da Europa",
    category: "Geografia",
    difficulty: "Médio",
    createdAt: "2023-10-05",
  },
  {
    id: 6,
    title: "Verbos irregulares",
    category: "Português",
    difficulty: "Difícil",
    createdAt: "2023-10-03",
  },
];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    let filtered = [...questions];

    if (categoryFilter !== "all") {
      filtered = filtered.filter((q) => q.category === categoryFilter);
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((q) => q.difficulty === difficultyFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [questions, categoryFilter, difficultyFilter, searchQuery]);

  const handleDelete = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Questão excluída",
      description: "A questão foi excluída com sucesso",
    });
  };

  const categories = Array.from(new Set(questions.map((q) => q.category)));
  const difficulties = ["Fácil", "Médio", "Difícil"];

  return (
    <div className="container space-y-6 p-4 py-6 md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Questões</h1>
          <p className="text-muted-foreground">
            Gerencie suas questões e crie novas.
          </p>
        </div>
        <Link href="/questions/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Questão
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Buscar questões..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Dificuldade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as dificuldades</SelectItem>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{question.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-1 -mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/questions/${question.id}`}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                      onClick={() => handleDelete(question.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                Criada em{" "}
                {new Date(question.createdAt).toLocaleDateString("pt-BR")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{question.category}</Badge>
                <Badge
                  variant="outline"
                  className={
                    question.difficulty === "Fácil"
                      ? "border-green-500 text-green-500"
                      : question.difficulty === "Médio"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-red-500 text-red-500"
                  }
                >
                  {question.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">
            Nenhuma questão encontrada. Tente ajustar os filtros ou{" "}
            <Link
              href="/questions/create"
              className="text-primary hover:underline"
            >
              crie uma nova questão
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
