"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function CreateQuestionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [questionType, setQuestionType] = useState("multiple-choice")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: "0",
    correctAnswer: "", // Para questões dissertativas
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData((prev) => ({ ...prev, options: newOptions }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Questão criada com sucesso!",
        description: "A questão foi adicionada ao banco de questões.",
      })

      router.push("/questions")
    } catch (error) {
      toast({
        title: "Erro ao criar questão",
        description: "Ocorreu um erro ao tentar criar a questão.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl p-4 py-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Criar Nova Questão</h1>
        <p className="text-muted-foreground">Preencha os campos abaixo para criar uma nova questão.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Defina o título, categoria e dificuldade da questão.</CardDescription>
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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
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
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Dificuldade</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
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

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Conteúdo da Questão</CardTitle>
            <CardDescription>Defina o enunciado e as opções de resposta.</CardDescription>
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
                defaultValue={questionType}
                onValueChange={setQuestionType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple-choice" id="multiple-choice" />
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
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, correctOption: value }))}
                        className="flex items-center"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      </RadioGroup>
                      <Input
                        placeholder={`Alternativa ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Selecione o botão ao lado da alternativa correta.</p>
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
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/questions")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Questão"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

