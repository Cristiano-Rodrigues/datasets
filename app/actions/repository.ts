import { sql } from '../config'

type DataEntry = {
  source?: string;
  translation?: string;
  question?: string;
  answer?: string
  structure: string;
  context: string;
}

export async function insertTranslationEntry (entry: DataEntry) {
  if (!entry.translation || !entry.source) {
    return
  }

  await sql`
    INSERT INTO translation (target, source, structure, context)
    VALUES (
      ${entry.translation}, ${entry.source}, ${entry.structure},
      ${entry.context}
    )
  `
}

export async function insertQAEntry (entry: DataEntry) {
  if (!entry.question || !entry.answer) {
    return
  }

  await sql`
    INSERT INTO qa (question, answer, structure, context)
    VALUES (
      ${entry.question}, ${entry.answer}, ${entry.structure},
      ${entry.context}
    )
  `
}