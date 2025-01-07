import { Eye, EyeClosed } from 'lucide-react'
import { FC, useState } from 'react'

export const Input: FC<{
  value: string
  onChange: (value: string) => void
  secure?: boolean
  placeholder?: string
}> = ({ onChange, value, secure, placeholder }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex h-10 w-full items-center justify-between px-2 shadow-sm bg-zinc-50 rounded-sm border border-zinc-100">
      <input
        placeholder={placeholder}
        type={secure && !visible ? 'password' : 'text'}
        className="flex flex-1 h-full bg-transparent"
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={value}
      />
      {secure && (
        <button onClick={() => setVisible(!visible)} className="flex bg-transparent">
          {visible ? <Eye color="#444" /> : <EyeClosed color="#444" />}
        </button>
      )}
    </div>
  )
}
