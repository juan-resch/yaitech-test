export function getSkipTake(params: { page?: number; pageSize?: number }): {
  skip: number
  take: number
} {
  const page = params.page || 1
  const pageSize = params.pageSize || 15

  return {
    take: pageSize,
    skip: (page - 1) * pageSize,
  }
}
