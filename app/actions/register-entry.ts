'use server'

import { z } from "zod"
import { sql } from "../config"

export async function registerEntry (_: unknown, formData: FormData) {
  const translationType = 'Tradução'
  const TranslationSchema = z.object({
    source: z.string().nonempty(),
    translation: z.string().nonempty()
  })
  const QASchema = z.object({
    question: z.string().nonempty(),
    answer: z.string()
  })
  const DataEntrySchema = TranslationSchema.or(QASchema)

  const type = formData.get('type')
  const data = type == translationType ? {
    source: formData.get('source'),
    translation: formData.get('translation')
  } : {
    question: formData.get('question'),
    answer: formData.get('answer')
  }

  const parsed = DataEntrySchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Insira correctamente os dados requisitados!'
    }
  }

  const entry = parsed.data

  try {
    if ('translation' in entry) {
      await sql`INSERT INTO translation (target, source) VALUES (${entry.translation}, ${entry.source})`
    } else {
      await sql`INSERT INTO answer (question, answer) VALUES (${entry.question}, ${entry.answer})`
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Algum erro ocorreu ao registar os dados'
    }
  }

  return {
    success: true,
    message: 'Entrada registada com sucesso!'
  }
}