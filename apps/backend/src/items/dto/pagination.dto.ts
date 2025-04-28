/* eslint-disable @nx/enforce-module-boundaries */
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsInt, Min } from "class-validator"
import { z } from "zod"

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
