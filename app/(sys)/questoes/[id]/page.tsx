"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  BarChart,
  FileText,
  Tag,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Copy,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Dados simulados da questão
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
  explanation:
    "A fórmula de Bhaskara para resolver equações do segundo grau é x = (-b ± √(b² - 4ac)) / 2a, onde a, b e c são os coeficientes da equação ax² + bx + c = 0. O discriminante (b² - 4ac) determina o número de raízes reais da equação.",
  tags: ["Álgebra", "Equações", "Fórmula de Bhaskara", "Ensino Médio"],
  createdAt: "2023-10-15",
  lastUpdated: "2024-01-20",
  author: "Maria Silva",
  estimatedTime: 3, // minutos
  usedInExams: 8,
  relatedContent: [
    { id: 7, title: "Funções trigonométricas" },
    { id: 12, title: "Função exponencial" },
    { id: 15, title: "Progressão aritmética" },
  ],
  hasImage: false,
  imageUrl: null,
};

export default function QuestionViewPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Verificar o papel do usuário
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Em um sistema real, aqui seria feita uma requisição para obter os dados da questão
        await new Promise((resolve) => setTimeout(resolve, 800));
        setQuestion(mockQuestionData);
      } catch (error) {
        toast({
          title: "Erro ao carregar questão",
          description: "Não foi possível carregar os dados da questão.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleCheckAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Selecione uma opção",
        description: "Você precisa selecionar uma resposta antes de verificar.",
        variant: "destructive",
      });
      return;
    }

    setShowAnswer(true);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleCopyQuestion = () => {
    toast({
      title: "Questão copiada",
      description: "A questão foi copiada para a área de transferência.",
    });
  };

  const handlePrintQuestion = () => {
    window.print();
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  if (isLoading || !question) {
    return (
      <div className="container max-w-4xl p-4 py-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div>
            <div className="h-8 w-64 bg-muted animate-pulse rounded-md mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded-md" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-[200px] bg-muted animate-pulse rounded-md" />
          <div className="h-[300px] bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {question.title}
            </h1>
            <p className="text-muted-foreground">Visualização da questão</p>
          </div>
        </div>
        <div className="flex gap-2">
          {userRole === "professor" && (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() =>
                  router.push(`/questoes/${question.id}/dashboard`)
                }
              >
                <BarChart className="h-4 w-4" />
                Estatísticas
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push(`/questoes/${question.id}/editar`)}
              >
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 mt-6">
        <Card className="print:shadow-none">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {question.category}
              </Badge>
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
              <Badge
                variant="outline"
                className="border-blue-500 text-blue-500"
              >
                {question.type === "multiple-choice"
                  ? "Múltipla Escolha"
                  : "Dissertativa"}
              </Badge>
            </div>
            <CardTitle className="text-xl">{question.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Tempo estimado: {question.estimatedTime} minutos</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-base font-medium">Enunciado</div>
              <div className="rounded-md border p-4 bg-card">
                <p className="text-base">{question.question}</p>
                {question.hasImage && question.imageUrl && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={question.imageUrl || "/placeholder.svg"}
                      alt="Imagem da questão"
                      className="max-h-[300px] object-contain rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>

            {question.type === "multiple-choice" && (
              <div className="space-y-4">
                <div className="text-base font-medium">Alternativas</div>
                <RadioGroup
                  value={selectedOption?.toString() || ""}
                  onValueChange={(value) =>
                    !showAnswer && setSelectedOption(Number.parseInt(value))
                  }
                  className="space-y-3"
                >
                  {question.options.map((option: string, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 rounded-md border p-3 ${
                        showAnswer && index === question.correctOption
                          ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                          : showAnswer &&
                            index === selectedOption &&
                            index !== question.correctOption
                          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                          : ""
                      }`}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        disabled={showAnswer}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer font-normal"
                      >
                        {option}
                      </Label>
                      {showAnswer && index === question.correctOption && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {showAnswer &&
                        index === selectedOption &&
                        index !== question.correctOption && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {showAnswer && (
              <div className="space-y-4">
                <Separator />
                <div className="flex items-center gap-2 text-base font-medium">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Explicação
                </div>
                <div className="rounded-md border p-4 bg-primary/5">
                  <p className="text-base">{question.explanation}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleCopyQuestion}
              >
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 print:hidden"
                onClick={handlePrintQuestion}
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
            </div>
            {!showAnswer ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
              >
                Verificar Resposta
              </Button>
            ) : (
              <Button onClick={handleTryAgain} variant="outline">
                Tentar Novamente
              </Button>
            )}
          </CardFooter>
        </Card>

        <Tabs defaultValue="details" className="w-full print:hidden">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags e Tópicos
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Conteúdo Relacionado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Informações Detalhadas</CardTitle>
                <CardDescription>
                  Metadados e informações adicionais sobre a questão.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Autor</p>
                    <p className="text-sm text-muted-foreground">
                      {question.author}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Data de Criação</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(question.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Última Atualização</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(question.lastUpdated)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">
                      {question.category}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dificuldade</p>
                    <p className="text-sm text-muted-foreground">
                      {question.difficulty}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tipo</p>
                    <p className="text-sm text-muted-foreground">
                      {question.type === "multiple-choice"
                        ? "Múltipla Escolha"
                        : "Dissertativa"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tempo Estimado</p>
                    <p className="text-sm text-muted-foreground">
                      {question.estimatedTime} minutos
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Uso em Provas</p>
                    <p className="text-sm text-muted-foreground">
                      {question.usedInExams} provas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Tags e Tópicos</CardTitle>
                <CardDescription>
                  Categorização e classificação da questão.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Habilidades Avaliadas
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Compreensão e aplicação da fórmula de Bhaskara</li>
                      <li>
                        • Identificação dos coeficientes em uma equação do
                        segundo grau
                      </li>
                      <li>• Resolução de equações quadráticas</li>
                      <li>
                        • Interpretação geométrica das raízes de uma equação
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Base Curricular
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>BNCC - EM13MAT401:</strong> Converter
                      representações algébricas de funções polinomiais de 2º
                      grau para representações geométricas no plano cartesiano,
                      distinguindo os casos nos quais uma variável for
                      diretamente proporcional ao quadrado da outra, recorrendo
                      ou não a softwares ou aplicativos de álgebra e geometria
                      dinâmica.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo Relacionado</CardTitle>
                <CardDescription>
                  Questões e materiais relacionados a este tópico.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Questões Relacionadas
                    </h3>
                    <div className="space-y-3">
                      {question.relatedContent.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{item.title}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/questoes/${item.id}/visualizar`)
                            }
                          >
                            Ver
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Material de Estudo Recomendado
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        • Capítulo 4: Equações do Segundo Grau - Livro
                        Matemática Fundamental
                      </li>
                      <li>• Vídeo-aula: Aplicações da Fórmula de Bhaskara</li>
                      <li>
                        • Exercícios complementares sobre equações quadráticas
                      </li>
                      <li>
                        • Simulador interativo de gráficos de funções
                        quadráticas
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
