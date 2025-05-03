import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDate,
  IsInt,
} from "class-validator"

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image!: string

  @ApiProperty()
  @IsNumber()
  price!: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string

  @ApiProperty()
  @IsDate()
  createdAt!: Date

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category!: string

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean = true

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location!: string

  @ApiProperty()
  @IsInt()
  ownerId!: number

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  rating?: number = 0

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  views?: number = 0
}
