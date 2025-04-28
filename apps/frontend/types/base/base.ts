import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http"

export type Options = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[]
      }
  observe?: "body"
  context?: HttpContext
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
      }
  reportProgress?: boolean
  responseType?: "json"
  withCredentials?: boolean
  transferCache?:
    | {
        includeHeaders?: string[]
      }
    | boolean
}

import { z } from "zod"

export const paginationSchema = z.object({
  skip: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
})

export type Pagination = z.infer<typeof paginationSchema>
