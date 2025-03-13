"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStudentData = [
  { id: 1, name: "Ana Silva", questionsAnswered: 24, correctAnswers: 18 },
  { id: 2, name: "Bruno Costa", questionsAnswered: 18, correctAnswers: 12 },
  { id: 3, name: "Carla Oliveira", questionsAnswered: 30, correctAnswers: 25 },
  { id: 4, name: "Daniel Santos", questionsAnswered: 15, correctAnswers: 9 },
  { id: 5, name: "Elena Martins", questionsAnswered: 22, correctAnswers: 20 },
];

const mockCategoryData = [
  { id: 1, name: "Matemática", questionsCount: 15, averageScore: 72 },
  { id: 2, name: "Português", questionsCount: 12, averageScore: 68 },
  { id: 3, name: "Ciências", questionsCount: 10, averageScore: 75 },
  { id: 4, name: "História", questionsCount: 8, averageScore: 65 },
  { id: 5, name: "Geografia", questionsCount: 7, averageScore: 70 },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Professor";
    setUserName(name);
  }, []);

  return (
    <div className="flex flex-col w-full p-4 py-6 gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {userName}! Aqui está o desempenho dos seus alunos.
          </p>
        </div>
        <Link href="/questions/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Questão
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alunos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questões Criadas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">+8 na última semana</p>
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
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              +5% desde o mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questões Respondidas
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              +42 na última semana
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Desempenho por Aluno</TabsTrigger>
          <TabsTrigger value="categories">Desempenho por Categoria</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockStudentData.map((student) => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>
                    {student.questionsAnswered} questões respondidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Taxa de acerto:{" "}
                      {Math.round(
                        (student.correctAnswers / student.questionsAnswered) *
                          100
                      )}
                      %
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {student.correctAnswers}/{student.questionsAnswered}
                    </span>
                  </div>
                  <Progress
                    value={
                      (student.correctAnswers / student.questionsAnswered) * 100
                    }
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCategoryData.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    {category.questionsCount} questões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Média de acertos: {category.averageScore}%
                    </span>
                  </div>
                  <Progress value={category.averageScore} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
