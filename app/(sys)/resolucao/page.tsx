"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const mockQuestions = [
  {
    id: 1,
    title: "Equação do segundo grau",
    category: "Matemática",
    difficulty: "Médio",
    question:
      "Qual é a fórmula para resolver uma equação do segundo grau ax² + bx + c = 0?",
    options: [
      "x = (-b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² + 4ac)) / 2a",
      "x = (b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² - 4ac)) / a",
    ],
    correctOption: 0,
  },
  {
    id: 2,
    title: "Análise sintática",
    category: "Português",
    difficulty: "Difícil",
    question: "Na frase 'O aluno estudou para a prova', qual é o sujeito?",
    options: ["O aluno", "estudou", "para a prova", "a prova"],
    correctOption: 0,
  },
  {
    id: 3,
    title: "Sistema solar",
    category: "Ciências",
    difficulty: "Fácil",
    question: "Qual é o planeta mais próximo do Sol?",
    options: ["Vênus", "Terra", "Mercúrio", "Marte"],
    correctOption: 2,
  },
  {
    id: 4,
    title: "Segunda Guerra Mundial",
    category: "História",
    difficulty: "Médio",
    question: "Em que ano terminou a Segunda Guerra Mundial?",
    options: ["1943", "1944", "1945", "1946"],
    correctOption: 2,
  },
  {
    id: 5,
    title: "Capitais da Europa",
    category: "Geografia",
    difficulty: "Médio",
    question: "Qual é a capital da Espanha?",
    options: ["Lisboa", "Barcelona", "Madri", "Valência"],
    correctOption: 2,
  },
];

export default function SolvePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Aluno";
    setUserName(name);
  }, []);

  const handleAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Selecione uma opção",
        description: "Você precisa selecionar uma resposta antes de confirmar.",
        variant: "destructive",
      });
      return;
    }

    setIsAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    if (selectedOption === mockQuestions[currentQuestion].correctOption) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      toast({
        title: "Parabéns!",
        description: "Você completou todas as questões disponíveis.",
      });
    }
  };

  const question = mockQuestions[currentQuestion];

  return (
    <div className="app-main">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Resolver Questões</h1>
        <p className="text-muted-foreground">
          Olá, {userName}! Responda as questões e receba feedback imediato.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Questão {currentQuestion + 1} de {mockQuestions.length}
          </div>
          <div className="text-sm font-medium">
            Acertos: {correctAnswers}/{totalAnswered}
          </div>
        </div>
        <Progress
          value={((currentQuestion + 1) / mockQuestions.length) * 100}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{question.title}</CardTitle>
            <div className="flex gap-2">
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
          </div>
          <CardDescription>{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedOption?.toString() || ""}
            onValueChange={(value) =>
              !isAnswered && setSelectedOption(Number.parseInt(value))
            }
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-md border p-3 ${
                  isAnswered && index === question.correctOption
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : isAnswered &&
                      index === selectedOption &&
                      index !== question.correctOption
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                    : ""
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={isAnswered}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option}
                </Label>
                {isAnswered && index === question.correctOption && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {isAnswered &&
                  index === selectedOption &&
                  index !== question.correctOption && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isAnswered ? (
            <Button onClick={handleAnswer}>Responder</Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestion < mockQuestions.length - 1
                ? "Próxima Questão"
                : "Recomeçar"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-6 flex justify-center">
        <Link href="/perfil">
          <Button variant="outline">Ver Meu Progresso</Button>
        </Link>
      </div>
    </div>
  );
}
