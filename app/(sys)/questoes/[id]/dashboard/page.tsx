"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  BarChart,
  PieChart,
  LineChart,
  Clock,
  Users,
  Calendar,
  ChevronLeft,
  FileText,
  Award,
  TrendingUp,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const mockQuestionData = {
  id: 1,
  title: "Equação do segundo grau",
  category: "Matemática",
  difficulty: "Médio",
  question:
    "Qual é a fórmula para resolver uma equação do segundo grau ax² + bx + c = 0?",
  type: "multiple-choice",
  options: [
    "x = (-b ± √(b² - 4ac)) / 2a",
    "x = (-b ± √(b² + 4ac)) / 2a",
    "x = (b ± √(b² - 4ac)) / 2a",
    "x = (-b ± √(b² - 4ac)) / a",
  ],
  correctOption: 0,
  createdAt: "2023-10-15",
  totalAnswers: 248,
  correctAnswers: 186,
  averageTime: 45,
  difficultyScore: 0.75,
  usedInExams: 8,
  lastUsed: "2024-05-10",
};

const mockOptionStats = [
  {
    option: "x = (-b ± √(b² - 4ac)) / 2a",
    count: 186,
    percentage: 75,
    isCorrect: true,
  },
  {
    option: "x = (-b ± √(b² + 4ac)) / 2a",
    count: 32,
    percentage: 13,
    isCorrect: false,
  },
  {
    option: "x = (b ± √(b² - 4ac)) / 2a",
    count: 18,
    percentage: 7,
    isCorrect: false,
  },
  {
    option: "x = (-b ± √(b² - 4ac)) / a",
    count: 12,
    percentage: 5,
    isCorrect: false,
  },
];

const mockClassPerformance = [
  {
    id: 1,
    name: "3º Ano A",
    totalStudents: 28,
    answeredCount: 28,
    correctCount: 22,
    averageTime: 42,
  },
  {
    id: 2,
    name: "3º Ano B",
    totalStudents: 25,
    answeredCount: 25,
    correctCount: 18,
    averageTime: 48,
  },
  {
    id: 3,
    name: "2º Ano A",
    totalStudents: 30,
    answeredCount: 30,
    correctCount: 21,
    averageTime: 50,
  },
  {
    id: 4,
    name: "2º Ano B",
    totalStudents: 28,
    answeredCount: 28,
    correctCount: 19,
    averageTime: 46,
  },
  {
    id: 5,
    name: "2º Ano C",
    totalStudents: 27,
    answeredCount: 27,
    correctCount: 20,
    averageTime: 44,
  },
];

const mockExamHistory = [
  {
    id: 1,
    title: "Simulado Nacional de Matemática",
    date: "2024-05-10",
    correctPercentage: 78,
  },
  {
    id: 2,
    title: "Avaliação Trimestral de Matemática",
    date: "2024-03-15",
    correctPercentage: 72,
  },
  {
    id: 3,
    title: "Simulado Preparatório ENEM",
    date: "2024-02-20",
    correctPercentage: 68,
  },
  {
    id: 4,
    title: "Avaliação Bimestral de Matemática",
    date: "2023-11-10",
    correctPercentage: 70,
  },
  { id: 5, title: "Simulado Geral", date: "2023-09-05", correctPercentage: 65 },
];

const mockTrendData = [
  { month: "Jan", correctPercentage: 65 },
  { month: "Fev", correctPercentage: 68 },
  { month: "Mar", correctPercentage: 72 },
  { month: "Abr", correctPercentage: 70 },
  { month: "Mai", correctPercentage: 78 },
];

const mockCorrelatedQuestions = [
  {
    id: 7,
    title: "Funções trigonométricas",
    correlation: "alta",
    correctPercentage: 68,
  },
  {
    id: 12,
    title: "Função exponencial",
    correlation: "média",
    correctPercentage: 62,
  },
  {
    id: 15,
    title: "Progressão aritmética",
    correlation: "média",
    correctPercentage: 70,
  },
];

export default function QuestionStatsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados para CSV.",
    });
  };

  const correctPercentage = Math.round(
    (mockQuestionData.correctAnswers / mockQuestionData.totalAnswers) * 100
  );
  const incorrectPercentage = 100 - correctPercentage;

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} segundos`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getDifficultyLevel = (score: number) => {
    if (score >= 0.8) return { label: "Fácil", color: "text-green-500" };
    if (score >= 0.6) return { label: "Médio", color: "text-yellow-500" };
    return { label: "Difícil", color: "text-red-500" };
  };

  const difficultyInfo = getDifficultyLevel(mockQuestionData.difficultyScore);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  if (isLoading) {
    return (
      <div className="container space-y-6 p-4 py-6 md:p-8">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div>
            <div className="h-8 w-64 bg-muted animate-pulse rounded-md mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded-md" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-md" />
            ))}
        </div>

        <div className="h-96 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/questoes")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {mockQuestionData.title}
            </h1>
            <p className="text-muted-foreground">
              Estatísticas e análise de desempenho
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2" onClick={handleExportData}>
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Acerto
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correctPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {mockQuestionData.correctAnswers} de{" "}
              {mockQuestionData.totalAnswers} respostas corretas
            </p>
            <Progress value={correctPercentage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(mockQuestionData.averageTime)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tempo médio para responder
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dificuldade</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${difficultyInfo.color}`}>
              {difficultyInfo.label}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseado em {mockQuestionData.totalAnswers} respostas
            </p>
            <Progress
              value={mockQuestionData.difficultyScore * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso em Provas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockQuestionData.usedInExams}
            </div>
            <p className="text-xs text-muted-foreground">
              Última vez em {formatDate(mockQuestionData.lastUsed)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Questão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Categoria</p>
              <p className="text-sm text-muted-foreground">
                {mockQuestionData.category}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Dificuldade Configurada</p>
              <p className="text-sm text-muted-foreground">
                {mockQuestionData.difficulty}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Tipo</p>
              <p className="text-sm text-muted-foreground">
                {mockQuestionData.type === "multiple-choice"
                  ? "Múltipla Escolha"
                  : "Dissertativa"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Data de Criação</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(mockQuestionData.createdAt)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total de Respostas</p>
              <p className="text-sm text-muted-foreground">
                {mockQuestionData.totalAnswers} respostas
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Última Utilização</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(mockQuestionData.lastUsed)}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Enunciado</h3>
            <div className="rounded-md border p-3 text-sm">
              {mockQuestionData.question}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Distribuição
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Turmas
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Provas
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tendências
          </TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Respostas</CardTitle>
              <CardDescription>
                Análise das respostas selecionadas pelos alunos para esta
                questão.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row mb-4">
                <div className="flex-1">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo o período</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                      <SelectItem value="quarter">Último trimestre</SelectItem>
                      <SelectItem value="year">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Gráfico de Distribuição
                  </h3>
                  <div className="aspect-square bg-muted/20 rounded-md flex items-center justify-center border">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Gráfico de distribuição de respostas
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Detalhamento por Alternativa
                  </h3>
                  <div className="space-y-4">
                    {mockOptionStats.map((option, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                option.isCorrect
                                  ? "border-green-500 text-green-500"
                                  : ""
                              }
                            >
                              {String.fromCharCode(65 + index)}
                            </Badge>
                            <span
                              className="text-sm truncate max-w-[250px]"
                              title={option.option}
                            >
                              {option.option}
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            {option.count} ({option.percentage}%)
                          </span>
                        </div>
                        <Progress
                          value={option.percentage}
                          className={`h-2 ${
                            option.isCorrect ? "bg-green-100" : ""
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-md bg-muted/20 border">
                    <h4 className="text-sm font-medium mb-2">Análise</h4>
                    <p className="text-sm text-muted-foreground">
                      A alternativa correta (A) foi escolhida por 75% dos
                      alunos, indicando um bom entendimento do conceito. A
                      alternativa B foi a segunda mais escolhida (13%),
                      sugerindo uma confusão comum sobre o sinal dentro da raiz
                      quadrada.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Turma</CardTitle>
              <CardDescription>
                Análise do desempenho de cada turma nesta questão.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turma</TableHead>
                      <TableHead>Alunos</TableHead>
                      <TableHead>Taxa de Acerto</TableHead>
                      <TableHead>Tempo Médio</TableHead>
                      <TableHead>Desempenho</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClassPerformance.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell className="font-medium">
                          {cls.name}
                        </TableCell>
                        <TableCell>
                          {cls.answeredCount}/{cls.totalStudents}
                        </TableCell>
                        <TableCell>
                          {Math.round(
                            (cls.correctCount / cls.answeredCount) * 100
                          )}
                          %
                        </TableCell>
                        <TableCell>{formatTime(cls.averageTime)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={
                                (cls.correctCount / cls.answeredCount) * 100
                              }
                              className="h-2 w-24"
                            />
                            <span className="text-sm">
                              {cls.correctCount}/{cls.answeredCount}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video bg-muted/20 rounded-md flex items-center justify-center border">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Gráfico de desempenho por turma
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-muted/20 border">
                  <h4 className="text-sm font-medium mb-2">Insights</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • A turma 3º Ano A teve o melhor desempenho (79% de
                      acertos)
                    </li>
                    <li>
                      • A turma 2º Ano B teve o menor desempenho (68% de
                      acertos)
                    </li>
                    <li>
                      • O tempo médio de resposta foi menor nas turmas do 3º ano
                    </li>
                    <li>
                      • Todas as turmas tiveram taxa de acerto acima de 65%
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle>Histórico em Provas</CardTitle>
              <CardDescription>
                Desempenho da questão nas provas em que foi utilizada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prova</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Taxa de Acerto</TableHead>
                      <TableHead>Desempenho</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockExamHistory.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">
                          {exam.title}
                        </TableCell>
                        <TableCell>{formatDate(exam.date)}</TableCell>
                        <TableCell>{exam.correctPercentage}%</TableCell>
                        <TableCell>
                          <Progress
                            value={exam.correctPercentage}
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="aspect-[2/1] bg-muted/20 rounded-md flex items-center justify-center border">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Gráfico de desempenho ao longo do tempo
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-md bg-muted/20 border">
                <h4 className="text-sm font-medium mb-2">
                  Análise de Tendência
                </h4>
                <p className="text-sm text-muted-foreground">
                  A taxa de acerto desta questão tem aumentado ao longo do
                  tempo, com uma melhoria de 13 pontos percentuais desde a
                  primeira aplicação. Isso pode indicar que o conteúdo está
                  sendo melhor trabalhado em sala de aula ou que os alunos estão
                  mais familiarizados com este tipo de questão.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Tendências e Correlações</CardTitle>
              <CardDescription>
                Análise de tendências e correlações com outras questões.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Evolução da Taxa de Acerto
                  </h3>
                  <div className="aspect-[4/3] bg-muted/20 rounded-md flex items-center justify-center border">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Gráfico de evolução da taxa de acerto
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    {mockTrendData.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm font-medium">
                          {data.correctPercentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {data.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Questões Correlacionadas
                  </h3>
                  <div className="space-y-4">
                    {mockCorrelatedQuestions.map((question) => (
                      <div
                        key={question.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {question.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Correlação {question.correlation} • Taxa de acerto:{" "}
                            {question.correctPercentage}%
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(`/questoes/${question.id}/dashboard`)
                          }
                        >
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-md bg-muted/20 border">
                <h4 className="text-sm font-medium mb-2">Recomendações</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • Esta questão tem uma boa taxa de discriminação (0.42),
                    sendo eficaz para avaliar o conhecimento dos alunos
                  </li>
                  <li>
                    • Considere incluir esta questão em simulados preparatórios
                    para o ENEM
                  </li>
                  <li>
                    • Alunos que acertam esta questão tendem a ter bom
                    desempenho em questões sobre funções trigonométricas
                  </li>
                  <li>
                    • Recomenda-se revisar o conteúdo com as turmas do 2º ano
                    antes de aplicar esta questão
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
