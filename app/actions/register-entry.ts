'use server'

import { z } from 'zod'
import { insertQAEntry, insertTranslationEntry } from './repository'

export async function registerEntry (_: unknown, formData: FormData) {
  const TranslationSchema = z.object({
    source: z.string().nonempty(),
    translation: z.string().nonempty()
  })
  const QASchema = z.object({
    question: z.string().nonempty(),
    answer: z.string().nonempty()
  })

  const DataEntrySchema = z.object({
    structure: z.string(),
    context: z.string()
  })
    .and(TranslationSchema.or(QASchema))
  
  const data = {
    ...getProps(formData),
    structure: formData.get('structure'),
    context: formData.get('context')
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
    if ('translation' in entry)
      await insertTranslationEntry(entry)
    else {
      await insertQAEntry(entry)
    }
    console.log('dados cadastrados com sucesso!')
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

function getProps (formData: FormData) {
  const translationType = 'Tradução'

  return formData.get('type') == translationType ? {
    source: formData.get('source'),
    translation: formData.get('translation')
  } : {
    question: formData.get('question'),
    answer: formData.get('answer')
  }
}