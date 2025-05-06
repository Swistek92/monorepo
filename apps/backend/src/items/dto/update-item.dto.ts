/* eslint-disable @nx/enforce-module-boundaries */
import { ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
  IsBoolean,
  IsArray,
  IsDateString,
  IsInt,
  IsPositive,
  Max,
  IsEmail,
} from "class-validator"

export class UpdateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  image?: string

  @ApiPropertyOptional({ description: "Cena wywoławcza", minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number

  @ApiPropertyOptional({ description: "Cena kup teraz", minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  buyNowPrice?: number

  @ApiPropertyOptional({ description: "Ilość sztuk", minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number

  @ApiPropertyOptional({
    type: String,
    format: "date-time",
    description: "Data zakończenia aukcji",
  })
  @IsOptional()
  @IsDateString()
  auctionEndDate?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  ownerId?: number

  @ApiPropertyOptional({ minimum: 0, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  views?: number

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsEmail()
  ownerEmail?: string
}
