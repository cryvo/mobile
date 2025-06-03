import { useState } from 'react'

export default function Accordion({ title, children }: {title:string; children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded mb-2">
      <button
        onClick={()=>setOpen(o=>!o)}
        className="w-full text-left px-4 py-2 bg-gray-100"
      >
        {title}
      </button>
      {open && <div className="px-4 py-2">{children}</div>}
    </div>
  )
}
