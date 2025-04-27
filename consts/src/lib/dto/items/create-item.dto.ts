// src/items/dto/create-item.schema.ts
/* eslint-disable @nx/enforce-module-boundaries */

import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsUrl,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDate,
  IsInt,
  IsPositive,
  Max,
} from "class-validator"

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsUrl()
  image: string

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ type: String, format: "date-time" })
  @IsDate()
  createdAt: Date

  @ApiProperty()
  @IsString()
  category: string

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean = true

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[]

  @ApiProperty()
  @IsString()
  location: string

  @ApiProperty()
  @IsInt()
  @IsPositive()
  ownerId: number

  @ApiProperty({ minimum: 0, maximum: 5, required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number = 0

  @ApiProperty({ minimum: 0, required: false, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  views?: number = 0
}

// import { z } from "zod"

// export const CreateItemSchema = z.object({
//   name: z.string(),
//   image: z.string().url(),
//   price: z.number().min(0),
//   description: z.string(),
//   createdAt: z.coerce.date(),
//   category: z.string(),
//   available: z.boolean().optional().default(true),
//   tags: z.array(z.string()),
//   location: z.string(),
//   ownerId: z.number().int().positive(),
//   rating: z.number().min(0).max(5).optional().default(0),
//   views: z.number().int().min(0).optional().default(0),
// })
