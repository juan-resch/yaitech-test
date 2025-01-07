import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { MessageCircleIcon, Search, Trash } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuery } from '@tanstack/react-query'
import { $infra } from '@/requests/infra'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Book } from '@/components/Book'

export default function Books() {
  const [formData, setFormData] = useState<{ name: string; description: string; file: File | null }>({
    name: '',
    description: '',
    file: null,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const file = formData.file

    if (!file) return

    const result = await $infra.books.create({ ...formData, file })
    setDialogIsVisible(false)
    if (result.success) return refetch()

    return toast('Algo deu errado')
  }

  const [search, setSearch] = useState('')
  const [dialogIsVisible, setDialogIsVisible] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: ['list-books', search],
    queryFn: async () => {
      const { data } = await $infra.books.list({ search })

      if (data?.success) return data?.result.data
      else throw new Error('unknown')
    },
  })

  const handleDelete = async (bookId: string) => {
    const result = await $infra.books.delete({ bookId })
    refetch()
  }

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <Dialog open={dialogIsVisible} onOpenChange={setDialogIsVisible}>
        <main className="flex w-screen h-screen bg-gradient-to-br from-amber-50 via-zinc-200 to-purple-200 py-32 justify-center">
          <div className="flex flex-col flex-1 p-8 bg-white rounded-md shadow-md max-w-[1200px] gap-4">
            <div className="flex items-center w-full px-6 gap-4">
              <span className="text-xl font-bold">Seus livros</span>
              <Button onClick={() => setDialogIsVisible(true)}>Novo livro</Button>

              <div className="flex items-center h-10 border rounded-md bg-white shadow-sm border-zinc-100 font-semibold">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex flex-1 h-full px-2"
                  placeholder="Pesqusar"
                />
                <Button className="p-0 aspect-square" variant={'ghost'}>
                  <Search size={20} color="#888" />
                </Button>
              </div>
            </div>

            <div className="flex flex-1 w-full overflow-scroll">
              <div className="w-full flex-col gap-1 overflow-y-scroll px-4">
                {data?.map((book) => (
                  <Book key={book.id} book={book} onClickDelete={() => handleDelete(book.id)} />
                ))}
              </div>
            </div>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo livro</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-100 rounded shadow-md w-full max-w-md">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Livro:</label>
                <Button variant={'outline'} type="button" onClick={handleFileClick}>
                  Escolha o arquivo
                </Button>
                <input type="file" id="file" name="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                {formData.file && <p className="mt-2 text-sm text-gray-700">Arquivo selecionado: {formData.file.name}</p>}
              </div>

              <Button type="submit">Enviar</Button>
            </form>
          </DialogContent>
        </main>
      </Dialog>
    </>
  )
}
