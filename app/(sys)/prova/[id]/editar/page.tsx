"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const mockClasses = [
  { id: 1, name: "1º Ano A" },
  { id: 2, name: "1º Ano B" },
  { id: 3, name: "2º Ano A" },
  { id: 4, name: "2º Ano B" },
  { id: 5, name: "2º Ano C" },
  { id: 6, name: "3º Ano A" },
  { id: 7, name: "3º Ano B" },
];

const mockQuestions = [
  {
    id: 1,
    title: "Equação do segundo grau",
    subject: "Matemática",
    difficulty: "Médio",
  },
  {
    id: 2,
    title: "Análise sintática",
    subject: "Português",
    difficulty: "Difícil",
  },
  { id: 3, title: "Sistema solar", subject: "Ciências", difficulty: "Fácil" },
  {
    id: 4,
    title: "Segunda Guerra Mundial",
    subject: "História",
    difficulty: "Médio",
  },
  {
    id: 5,
    title: "Capitais da Europa",
    subject: "Geografia",
    difficulty: "Médio",
  },
  {
    id: 6,
    title: "Verbos irregulares",
    subject: "Português",
    difficulty: "Difícil",
  },
  {
    id: 7,
    title: "Funções trigonométricas",
    subject: "Matemática",
    difficulty: "Difícil",
  },
  { id: 8, title: "Tabela periódica", subject: "Química", difficulty: "Médio" },
];

const mockExamData = {
  id: 1,
  title: "Simulado Nacional de Matemática",
  subject: "Matemática",
  description:
    "Simulado preparatório para o ENEM, focado em conteúdos de matemática do ensino médio.",
  duration: "120",
  dueDate: "2024-06-15",
  createdDate: "2024-05-01",
  selectedClasses: [1, 2],
  selectedQuestions: [1, 2, 7],
  status: "active",
};

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    duration: "60",
    dueDate: "",
    selectedClasses: [] as number[],
    selectedQuestions: [] as number[],
  });

  useEffect(() => {
    const loadExamData = async () => {
      setIsLoadingData(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const dueDate = new Date(mockExamData.dueDate)
          .toISOString()
          .split("T")[0];

        setFormData({
          title: mockExamData.title,
          subject: mockExamData.subject,
          description: mockExamData.description,
          duration: mockExamData.duration,
          dueDate: dueDate,
          selectedClasses: mockExamData.selectedClasses,
          selectedQuestions: mockExamData.selectedQuestions,
        });
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da prova.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    loadExamData();
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassToggle = (classId: number) => {
    setFormData((prev) => {
      const selectedClasses = [...prev.selectedClasses];

      if (selectedClasses.includes(classId)) {
        return {
          ...prev,
          selectedClasses: selectedClasses.filter((id) => id !== classId),
        };
      } else {
        return {
          ...prev,
          selectedClasses: [...selectedClasses, classId],
        };
      }
    });
  };

  const handleQuestionToggle = (questionId: number) => {
    setFormData((prev) => {
      const selectedQuestions = [...prev.selectedQuestions];

      if (selectedQuestions.includes(questionId)) {
        return {
          ...prev,
          selectedQuestions: selectedQuestions.filter(
            (id) => id !== questionId
          ),
        };
      } else {
        return {
          ...prev,
          selectedQuestions: [...selectedQuestions, questionId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.title ||
        !formData.subject ||
        !formData.dueDate ||
        formData.selectedClasses.length === 0 ||
        formData.selectedQuestions.length === 0
      ) {
        toast({
          title: "Campos obrigatórios",
          description:
            "Preencha todos os campos obrigatórios e selecione pelo menos uma turma e uma questão.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Prova atualizada com sucesso!",
        description: "As alterações foram salvas.",
      });

      router.push("/prova");
    } catch (error) {
      toast({
        title: "Erro ao atualizar prova",
        description: "Ocorreu um erro ao tentar salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setShowDiscardDialog(true);
  };

  const confirmDiscard = () => {
    router.push("/prova");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  if (isLoadingData) {
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
          <div className="h-[200px] bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/prova")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Prova</h1>
          <p className="text-muted-foreground">
            Atualize as informações da prova criada em{" "}
            {formatDate(mockExamData.createdDate)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Atualize o título, disciplina e outras informações da prova.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título da Prova <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Avaliação Trimestral de Matemática"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Disciplina <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleSelectChange("subject", value)
                    }
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Selecione uma disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Português">Português</SelectItem>
                      <SelectItem value="Ciências">Ciências</SelectItem>
                      <SelectItem value="História">História</SelectItem>
                      <SelectItem value="Geografia">Geografia</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                      <SelectItem value="Biologia">Biologia</SelectItem>
                      <SelectItem value="Inglês">Inglês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duração (minutos) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="10"
                    max="240"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">
                  Data Limite <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Instruções ou informações adicionais sobre a prova..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Turmas</CardTitle>
              <CardDescription>
                Atualize as turmas que realizarão esta prova.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {mockClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${cls.id}`}
                      checked={formData.selectedClasses.includes(cls.id)}
                      onCheckedChange={() => handleClassToggle(cls.id)}
                    />
                    <label
                      htmlFor={`class-${cls.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cls.name}
                    </label>
                  </div>
                ))}
              </div>
              {formData.selectedClasses.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selecione pelo menos uma turma.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Questões</CardTitle>
                  <CardDescription>
                    Atualize as questões que farão parte desta prova.
                  </CardDescription>
                </div>
                <Link href="/questoes/criar">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Nova Questão
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="questions">
                  <AccordionTrigger>
                    Questões Selecionadas: {formData.selectedQuestions.length}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {mockQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="flex items-center space-x-2 rounded-md border p-2"
                        >
                          <Checkbox
                            id={`question-${question.id}`}
                            checked={formData.selectedQuestions.includes(
                              question.id
                            )}
                            onCheckedChange={() =>
                              handleQuestionToggle(question.id)
                            }
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={`question-${question.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {question.title}
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {question.subject} • {question.difficulty}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {formData.selectedQuestions.length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selecione pelo menos uma questão.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 flex justify-between">
                <p className="text-sm">
                  Total de questões selecionadas:{" "}
                  <strong>{formData.selectedQuestions.length}</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDiscard}
            >
              <Trash2 className="h-4 w-4" />
              Descartar Alterações
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>
      </form>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Descartar alterações?</AlertDialogTitle>
            <AlertDialogDescription>
              Todas as alterações feitas serão perdidas. Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDiscard}
              className="bg-destructive text-destructive-foreground"
            >
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
