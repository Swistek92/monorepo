/* eslint-disable @nx/enforce-module-boundaries */
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsInt, Min } from "class-validator"

export class PaginationDTO {
  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  skip?: number

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}

// import { z } from "zod"

// export const PaginationSchema = z.object({
//   skip: z.coerce.number().positive().optional(),
//   limit: z.coerce.number().positive().optional(),
// })

// export type PaginationDTO = z.infer<typeof PaginationSchema>
