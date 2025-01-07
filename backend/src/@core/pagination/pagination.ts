import { z } from 'zod'

import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

// Defines options for pagination including page size and current page number
export type PaginationOptions = {
  pageSize: number
  page: number
}

// Represents the structure of a paginated response
export type PaginationResponse<T> = {
  data: T[]
  page: number
  totalRecords: number
}

export class Pagination {
  /**
   * Paginates an array of items based on pagination options
   * @param model The array of items to paginate
   * @param options An object containing pagination options (`page` and `pageSize`)
   *                Defaults are page = 1 and pageSize = 10 if not provided.
   * @returns {PaginationResponse<T>} An object containing the paginated data,
   *          the current page, and the total number of records.
   */
  public static paginate<T>(
    model: T[],
    { page = 1, pageSize = 10 }: PaginationOptions = { page: 1, pageSize: 10 }
  ) {
    const startIndex = (page - 1) * pageSize // Calculate start index of the current page
    const endIndex = startIndex + pageSize // Calculate end index of the current page

    const data = model.slice(startIndex, endIndex)

    // Return the paginated response including the data, current page, and total records
    return {
      data,
      page,
      totalRecords: model.length,
    }
  }
}

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const pageSizeQueryParamSchema = z
  .string()
  .optional()
  .default('30')
  .transform(Number)
  .pipe(z.number().min(1))

export const pageQueryParamValidationPipe = new ZodValidationPipe(
  pageQueryParamSchema
)
export const pageSizeQueryParamValidationPipe = new ZodValidationPipe(
  pageSizeQueryParamSchema
)

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

export type PageSizeQueryParamSchema = z.infer<typeof pageSizeQueryParamSchema>
