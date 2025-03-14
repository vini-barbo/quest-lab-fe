"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, Trash2 } from "lucide-react";
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

// Dados simulados da questão para edição
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
  correctOption: "0",
  correctAnswer: "", // Para questões dissertativas
  createdAt: "2023-10-15",
};

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: "0",
    correctAnswer: "", // Para questões dissertativas
  });

  // Simular carregamento dos dados da questão
  useEffect(() => {
    const loadQuestionData = async () => {
      setIsLoadingData(true);
      try {
        // Em um sistema real, aqui seria feita uma requisição para obter os dados da questão
        await new Promise((resolve) => setTimeout(resolve, 800));

        setFormData({
          title: mockQuestionData.title,
          category: mockQuestionData.category,
          difficulty: mockQuestionData.difficulty,
          question: mockQuestionData.question,
          options: [...mockQuestionData.options],
          correctOption: mockQuestionData.correctOption,
          correctAnswer: mockQuestionData.correctAnswer,
        });

        setQuestionType(mockQuestionData.type);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da questão.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    loadQuestionData();
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação básica
      if (
        !formData.title ||
        !formData.category ||
        !formData.difficulty ||
        !formData.question
      ) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validação específica para o tipo de questão
      if (questionType === "multiple-choice") {
        const emptyOptions = formData.options.some((option) => !option.trim());
        if (emptyOptions) {
          toast({
            title: "Opções incompletas",
            description: "Preencha todas as opções de resposta.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      } else if (questionType === "essay" && !formData.correctAnswer.trim()) {
        toast({
          title: "Resposta correta ausente",
          description:
            "Informe a resposta correta para a questão dissertativa.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Questão atualizada com sucesso!",
        description: "As alterações foram salvas.",
      });

      router.push("/questoes");
    } catch (error) {
      toast({
        title: "Erro ao atualizar questão",
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
    router.push("/questoes");
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      // Simulação de exclusão
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Questão excluída com sucesso!",
        description: "A questão foi removida do banco de questões.",
      });

      router.push("/questoes");
    } catch (error) {
      toast({
        title: "Erro ao excluir questão",
        description: "Ocorreu um erro ao tentar excluir a questão.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Formatar a data para exibição
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
      <div className="container max-w-3xl p-4 py-6 md:p-8">
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
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/questoes")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Questão</h1>
          <p className="text-muted-foreground">
            Atualize a questão criada em{" "}
            {formatDate(mockQuestionData.createdAt)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Atualize o título, categoria e dificuldade da questão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Questão</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Equação do segundo grau"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
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
                  <Label htmlFor="difficulty">Dificuldade</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, difficulty: value }))
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Selecione a dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fácil">Fácil</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da Questão</CardTitle>
              <CardDescription>
                Atualize o enunciado e as opções de resposta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Enunciado</Label>
                <Textarea
                  id="question"
                  name="question"
                  placeholder="Digite o enunciado da questão..."
                  required
                  className="min-h-[100px]"
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Questão</Label>
                <RadioGroup
                  value={questionType}
                  onValueChange={setQuestionType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="multiple-choice"
                      id="multiple-choice"
                    />
                    <Label htmlFor="multiple-choice" className="font-normal">
                      Múltipla Escolha
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="essay" id="essay" />
                    <Label htmlFor="essay" className="font-normal">
                      Dissertativa
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {questionType === "multiple-choice" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Alternativas</Label>
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <RadioGroup
                          value={formData.correctOption}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              correctOption: value,
                            }))
                          }
                          className="flex items-center"
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`option-${index}`}
                          />
                        </RadioGroup>
                        <Input
                          placeholder={`Alternativa ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selecione o botão ao lado da alternativa correta.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="correctAnswer">Resposta Correta</Label>
                  <Textarea
                    id="correctAnswer"
                    name="correctAnswer"
                    placeholder="Digite a resposta correta para esta questão..."
                    className="min-h-[100px]"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              className="flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Excluir Questão
            </Button>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" variant="outline" onClick={handleDiscard}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
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
            <AlertDialogAction onClick={confirmDiscard}>
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir questão?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A questão será permanentemente
              removida do banco de questões.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
