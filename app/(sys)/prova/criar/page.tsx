"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";

// Dados simulados
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

export default function CreateExamPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    duration: "60",
    dueDate: "",
    selectedClasses: [] as number[],
    selectedQuestions: [] as number[],
  });

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
      // Validação básica
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

      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Prova criada com sucesso!",
        description: "A prova foi criada e atribuída às turmas selecionadas.",
      });

      router.push("/prova");
    } catch (error) {
      toast({
        title: "Erro ao criar prova",
        description: "Ocorreu um erro ao tentar criar a prova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-main">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Criar Nova Prova</h1>
        <p className="text-muted-foreground">
          Preencha os campos abaixo para criar uma nova prova ou simulado.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina o título, disciplina e outras informações da prova.
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
                Selecione as turmas que realizarão esta prova.
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
              <CardTitle>Questões</CardTitle>
              <CardDescription>
                Selecione as questões que farão parte desta prova.
              </CardDescription>
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
                <Link
                  href="/questions/create"
                  className="text-sm text-primary hover:underline"
                >
                  Criar nova questão
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/prova")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Prova"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
