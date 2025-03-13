"use client";

import { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Clock, User, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppHeader } from "@/components/layout/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockCategoryProgress = [
  { id: 1, name: "Matemática", total: 15, completed: 12, correct: 9 },
  { id: 2, name: "Português", total: 12, completed: 10, correct: 7 },
  { id: 3, name: "Ciências", total: 10, completed: 8, correct: 6 },
  { id: 4, name: "História", total: 8, completed: 5, correct: 3 },
  { id: 5, name: "Geografia", total: 7, completed: 6, correct: 5 },
];

const mockRecentActivity = [
  {
    id: 1,
    title: "Equação do segundo grau",
    category: "Matemática",
    date: "2023-10-15",
    correct: true,
  },
  {
    id: 2,
    title: "Análise sintática",
    category: "Português",
    date: "2023-10-14",
    correct: false,
  },
  {
    id: 3,
    title: "Sistema solar",
    category: "Ciências",
    date: "2023-10-13",
    correct: true,
  },
  {
    id: 4,
    title: "Segunda Guerra Mundial",
    category: "História",
    date: "2023-10-12",
    correct: false,
  },
  {
    id: 5,
    title: "Capitais da Europa",
    category: "Geografia",
    date: "2023-10-11",
    correct: true,
  },
];

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Usuário";
    const email = localStorage.getItem("userEmail") || "usuario@example.com";
    const role = localStorage.getItem("userRole") || "aluno";

    setUserName(name);
    setUserEmail(email);
    setUserRole(role === "aluno" ? "Aluno" : "Professor");
  }, []);

  const totalQuestions = mockCategoryProgress.reduce(
    (acc, cat) => acc + cat.total,
    0
  );
  const completedQuestions = mockCategoryProgress.reduce(
    (acc, cat) => acc + cat.completed,
    0
  );
  const correctAnswers = mockCategoryProgress.reduce(
    (acc, cat) => acc + cat.correct,
    0
  );
  const completionRate = Math.round(
    (completedQuestions / totalQuestions) * 100
  );
  const accuracyRate = Math.round((correctAnswers / completedQuestions) * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="app-main">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
              <p className="text-muted-foreground">
                Acompanhe seu progresso e atividades recentes.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Questões Respondidas
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedQuestions}</div>
                <p className="text-xs text-muted-foreground">
                  De um total de {totalQuestions} questões
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conclusão
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <Progress value={completionRate} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Acerto
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accuracyRate}%</div>
                <Progress value={accuracyRate} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tempo de Estudo
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4h 32m</div>
                <p className="text-xs text-muted-foreground">
                  Nos últimos 7 dias
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Informações do Usuário</CardTitle>
                <CardDescription>Seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">{userEmail}</p>
                    <p className="text-sm text-muted-foreground">{userRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Progresso por Categoria</CardTitle>
                <CardDescription>
                  Seu desempenho em cada categoria de questões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCategoryProgress.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {category.correct}/{category.completed} acertos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(category.completed / category.total) * 100}
                        className="h-2"
                      />
                      <span className="w-10 text-sm text-muted-foreground">
                        {Math.round(
                          (category.completed / category.total) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Suas últimas questões respondidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="correct">Corretas</TabsTrigger>
                  <TabsTrigger value="incorrect">Incorretas</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full p-1 ${
                            activity.correct
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {activity.correct ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="correct" className="space-y-4">
                  {mockRecentActivity
                    .filter((activity) => activity.correct)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-green-100 p-1 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="incorrect" className="space-y-4">
                  {mockRecentActivity
                    .filter((activity) => !activity.correct)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-red-100 p-1 text-red-600">
                            <X className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
