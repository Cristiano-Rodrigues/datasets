import postgres from 'postgres'

const dbURL = process.env.DATABASE_URL ?? ''
export const sql = postgres(dbURL,  { ssl: 'verify-full' })
