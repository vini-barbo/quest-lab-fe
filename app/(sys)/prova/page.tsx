"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Award,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Users,
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
import { Input } from "@/components/ui/input";
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

const mockExam = {
  id: 1,
  title: "Simulado Nacional de Matemática",
  subject: "Matemática",
  createdDate: "2024-05-01",
  dueDate: "2024-06-15",
  duration: 120,
  questionsCount: 30,
  difficulty: "Médio",
  classes: [
    { id: 1, name: "3º Ano A", studentsCount: 28, completedCount: 20 },
    { id: 2, name: "3º Ano B", studentsCount: 25, completedCount: 18 },
  ],
  averageScore: 76,
  passingScore: 60,
  questions: [
    {
      id: 1,
      number: 1,
      text: "Resolução de equação do 2º grau",
      correctAnswers: 32,
      totalAnswers: 38,
      difficulty: 0.84,
    },
    {
      id: 2,
      number: 2,
      text: "Teorema de Pitágoras",
      correctAnswers: 35,
      totalAnswers: 38,
      difficulty: 0.92,
    },
    {
      id: 3,
      number: 3,
      text: "Função exponencial",
      correctAnswers: 20,
      totalAnswers: 38,
      difficulty: 0.53,
    },
    {
      id: 4,
      number: 4,
      text: "Progressão aritmética",
      correctAnswers: 28,
      totalAnswers: 38,
      difficulty: 0.74,
    },
    {
      id: 5,
      number: 5,
      text: "Trigonometria básica",
      correctAnswers: 25,
      totalAnswers: 38,
      difficulty: 0.66,
    },
  ],
  students: [
    {
      id: 1,
      name: "Ana Silva",
      class: "3º Ano A",
      score: 90,
      completionTime: 98,
      status: "approved",
    },
    {
      id: 2,
      name: "Bruno Costa",
      class: "3º Ano A",
      score: 75,
      completionTime: 110,
      status: "approved",
    },
    {
      id: 3,
      name: "Carla Oliveira",
      class: "3º Ano A",
      score: 85,
      completionTime: 105,
      status: "approved",
    },
    {
      id: 4,
      name: "Daniel Santos",
      class: "3º Ano A",
      score: 55,
      completionTime: 115,
      status: "failed",
    },
    {
      id: 5,
      name: "Elena Martins",
      class: "3º Ano A",
      score: 95,
      completionTime: 90,
      status: "approved",
    },
    {
      id: 6,
      name: "Fábio Pereira",
      class: "3º Ano B",
      score: 80,
      completionTime: 100,
      status: "approved",
    },
    {
      id: 7,
      name: "Gabriela Lima",
      class: "3º Ano B",
      score: 70,
      completionTime: 118,
      status: "approved",
    },
    {
      id: 8,
      name: "Henrique Alves",
      class: "3º Ano B",
      score: 45,
      completionTime: 120,
      status: "failed",
    },
    {
      id: 9,
      name: "Isabela Rocha",
      class: "3º Ano B",
      score: 88,
      completionTime: 95,
      status: "approved",
    },
    {
      id: 10,
      name: "João Cardoso",
      class: "3º Ano B",
      score: 65,
      completionTime: 115,
      status: "approved",
    },
  ],
  scoreDistribution: [
    { range: "0-20", count: 0 },
    { range: "21-40", count: 1 },
    { range: "41-60", count: 2 },
    { range: "61-80", count: 4 },
    { range: "81-100", count: 3 },
  ],
};

export default function ExamResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [exam, setExam] = useState<any>(mockExam);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filteredStudents, setFilteredStudents] = useState(mockExam.students);

  const totalStudents = exam.students.length;
  const approvedStudents = exam.students.filter(
    (student) => student.status === "approved"
  ).length;
  const approvalRate = Math.round((approvedStudents / totalStudents) * 100);
  const averageCompletionTime = Math.round(
    exam.students.reduce((acc, student) => acc + student.completionTime, 0) /
      totalStudents
  );

  useEffect(() => {
    let filtered = [...exam.students];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(query)
      );
    }

    if (classFilter !== "all") {
      filtered = filtered.filter((student) => student.class === classFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredStudents(filtered);
  }, [exam.students, searchQuery, classFilter, statusFilter, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ""}`;
    }

    return `${mins} minutos`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= exam.passingScore) return "text-yellow-500";
    return "text-red-500";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty >= 0.8) return "Fácil";
    if (difficulty >= 0.6) return "Médio";
    return "Difícil";
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 0.8)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    if (difficulty >= 0.6)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  };

  const handleExportResults = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os resultados estão sendo exportados para CSV.",
    });
  };

  const uniqueClasses = Array.from(
    new Set(exam.students.map((student) => student.class))
  );

  return (
    <div className="container space-y-6 p-4 py-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/prova")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{exam.title}</h1>
            <p className="text-muted-foreground">
              Resultados e análise de desempenho
            </p>
          </div>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={handleExportResults}
        >
          <Download className="h-4 w-4" />
          Exportar Resultados
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getScoreColor(
                exam.averageScore
              )}`}
            >
              {exam.averageScore}%
            </div>
            <Progress value={exam.averageScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Aprovação
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate}%</div>
            <div className="text-xs text-muted-foreground">
              {approvedStudents} de {totalStudents} alunos
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCompletionTime} min
            </div>
            <div className="text-xs text-muted-foreground">
              De {formatDuration(exam.duration)} disponíveis
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conclusão</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exam.classes.reduce((acc, cls) => acc + cls.completedCount, 0)}/
              {exam.classes.reduce((acc, cls) => acc + cls.studentsCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">
              Alunos completaram a prova
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Prova</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Disciplina</p>
              <p className="text-sm text-muted-foreground">{exam.subject}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Data de Criação</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(exam.createdDate)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Data Limite</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(exam.dueDate)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Duração</p>
              <p className="text-sm text-muted-foreground">
                {formatDuration(exam.duration)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Número de Questões</p>
              <p className="text-sm text-muted-foreground">
                {exam.questionsCount} questões
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Nota de Aprovação</p>
              <p className="text-sm text-muted-foreground">
                {exam.passingScore}%
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Turmas</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {exam.classes.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{cls.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {cls.completedCount}/{cls.studentsCount} alunos
                    </span>
                    <Progress
                      value={(cls.completedCount / cls.studentsCount) * 100}
                      className="h-2 w-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Alunos
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Questões
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Alunos</CardTitle>
              <CardDescription>
                Lista de alunos que realizaram a prova e suas respectivas notas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar alunos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    prefix={
                      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    }
                  />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as turmas</SelectItem>
                    {uniqueClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="approved">Aprovados</SelectItem>
                    <SelectItem value="failed">Reprovados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">#</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1">
                          Nome
                          {sortConfig.key === "name" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="h-3 w-3" />
                            ) : (
                              <SortDesc className="h-3 w-3" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Turma</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("score")}
                      >
                        <div className="flex items-center gap-1">
                          Nota
                          {sortConfig.key === "score" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="h-3 w-3" />
                            ) : (
                              <SortDesc className="h-3 w-3" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("completionTime")}
                      >
                        <div className="flex items-center gap-1">
                          Tempo
                          {sortConfig.key === "completionTime" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="h-3 w-3" />
                            ) : (
                              <SortDesc className="h-3 w-3" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell className={getScoreColor(student.score)}>
                          {student.score}%
                        </TableCell>
                        <TableCell>{student.completionTime} min</TableCell>
                        <TableCell>
                          {student.status === "approved" ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Aprovado
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              Reprovado
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed mt-4">
                  <Users className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum aluno encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Questão</CardTitle>
              <CardDescription>
                Desempenho dos alunos em cada questão da prova.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Questão</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Acertos</TableHead>
                      <TableHead>Taxa de Acerto</TableHead>
                      <TableHead>Dificuldade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exam.questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">
                          {question.number}
                        </TableCell>
                        <TableCell>{question.text}</TableCell>
                        <TableCell>
                          {question.correctAnswers}/{question.totalAnswers}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={
                                (question.correctAnswers /
                                  question.totalAnswers) *
                                100
                              }
                              className="h-2 w-20"
                            />
                            <span>
                              {Math.round(
                                (question.correctAnswers /
                                  question.totalAnswers) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getDifficultyColor(question.difficulty)}
                          >
                            {getDifficultyLabel(question.difficulty)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-4">
                  Distribuição de Notas
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {exam.scoreDistribution.map((range) => (
                    <div
                      key={range.range}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="bg-primary/10 w-full"
                        style={{
                          height: `${(range.count / totalStudents) * 200}px`,
                          minHeight: "20px",
                        }}
                      />
                      <p className="text-xs mt-1">{range.range}%</p>
                      <p className="text-xs text-muted-foreground">
                        {range.count} alunos
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
