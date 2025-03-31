'use client'

import clsx from "clsx"
import { useState } from "react"

export function SelectInput ({
  items,
  handleInputChange,
}: {
  items: string[],
  handleInputChange: (newInput: string) => void,
}) {
  const [selected, setSelected] = useState(items[0])
  const [open, setOpen] = useState(false)

  const handleChangeOpen = () => {
    setOpen(!open)
  }
  const handleChangeSelected = (i: number) => {
    setSelected(items[i])
    setOpen(false)
    handleInputChange(items[i])
  }

  return (
    <div className="cursor-pointer relative">
      <input
        type="text"
        name="type"
        className="w-full p-3 bg-gray-200 rounded-md cursor-pointer outline-0"
        onClick={handleChangeOpen}
        value={selected}
        readOnly
      />
      <div className={clsx("absolute w-full shadow-2xl", {
        "hidden": !open
      })}>
      {
        items.map((item, i) => (
          <div
            key={i}
            className="w-full p-3 bg-gray-200 first:rounded-t-md last:rounded-b-md hover:bg-gray-300 transition delay-50"
            onClick={handleChangeSelected.bind(null, i)}
          >{ item }</div>
        ))
      }
      </div>
    </div>
  )
}