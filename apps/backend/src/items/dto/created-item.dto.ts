import { CategoryEnum } from "@my-monorepo/consts"
import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsUrl,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  IsPositive,
  Max,
  IsEmail,
  IsDateString,
  IsEnum,
} from "class-validator"

export class CreatedItemDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  id: number

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsUrl()
  image: string

  @ApiProperty()
  @IsBoolean()
  isAuction: boolean

  @ApiProperty()
  @IsNumber()
  @Min(0)
  startingPrice: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  buyNowPrice?: number

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number

  @ApiProperty({ type: String, format: "date-time" })
  @IsDateString()
  auctionEndDate: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ type: String, format: "date-time" })
  @IsDateString()
  createdAt: string

  @ApiProperty({ enum: CategoryEnum })
  @IsEnum(CategoryEnum)
  category: CategoryEnum

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  ownerEmail?: string
}
