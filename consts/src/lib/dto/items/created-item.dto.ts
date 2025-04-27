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
  IsEmail,
} from "class-validator"

export class CreatedItemDto {
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

  // 🔥 NOWE pola (z CreatedItemSchema):

  @ApiProperty()
  @IsInt()
  @IsPositive()
  id: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  ownerEmail?: string
}
