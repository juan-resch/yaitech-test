export default function getFileUrl(fileName: string): string {
  const env = process.env['NODE_ENV']

  if (env === 'development') return `https://localhost:8000/${fileName}`

  return ''
}
