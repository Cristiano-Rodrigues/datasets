'use client'

import React, { useActionState, useState } from 'react'
import { SelectInput } from './components/select-type'
import { registerEntry } from './actions/register-entry'
import CircularProgress from '@mui/material/CircularProgress'
import { Alert } from '@mui/material'

export default function Home() {
  const items = [
    'Tradução',
    'Pergunta-resposta'
  ]
  const [inputType, setInputType] = useState(items[0])

  const handleInputChange = (newInput: string) => {
    setInputType(newInput)
  }

  const initialState = {
    success: false,
    message: ''
  }
  const [state, formAction, pending] = useActionState(registerEntry, initialState)

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <form action={formAction} className="flex flex-col gap-2 w-full max-w-[400px] bg-white rounded-md p-4 shadow-2xl">
        <h1 className="text-2xl font-bold">Entrada do dataset</h1>

        {
          state.message && (
            <Alert severity={state.success ? 'success' : 'error' }>{ state.message }</Alert>
          )
        }

        <div>
          <p>Tipo de dataset</p>
          <SelectInput
            items={items}
            handleInputChange={handleInputChange}
          />
        </div>

        {
          inputType == items[0] ? (
            <>
              <div>
                <p>Texto em Kimbundu</p>
                <textarea id='source' name='source' placeholder='Texto em Kimbundu' className='w-full p-3 bg-gray-200 rounded-md outline-0 resize-none' required></textarea>
              </div>
              <div>
                <p>Tradução</p>
                <textarea id='translation' name='translation' placeholder='Tradução' className='w-full p-3 bg-gray-200 rounded-md outline-0 resize-none' required></textarea>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>Pergunta</p>
                <textarea id='question' name='question' placeholder='Pergunta' className='w-full p-3 bg-gray-200 rounded-md outline-0 resize-none' required></textarea>
              </div>
              <div>
                <p>Resposta</p>
                <textarea id='answer' name='answer' placeholder='Resposta' className='w-full p-3 bg-gray-200 rounded-md outline-0 resize-none' required></textarea>
              </div>
            </>
          )
        }

        <button
          className='flex justify-center items-center gap-2 bg-blue-600 text-white w-fit px-4 py-1 rounded-md ml-auto cursor-pointer'
          disabled={pending}
          type='submit'
        >
          Enviar
          { pending && <CircularProgress size={20} color='success' />}
        </button>
      </form>
    </div>
  )
}
