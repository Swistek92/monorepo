import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDateString,
  IsInt,
} from "class-validator"

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({
    required: false,
    default:
      "https://media.sketchfab.com/models/4bdae44017424870b1759db195618576/thumbnails/332515a54cb242948ab45fe368a63e69/7ee040f9cb6b4f12a383ea299bc9b0bf.jpeg",
  })
  @IsOptional()
  @IsString()
  image?: string

  @ApiProperty({ description: "Cena wywoławcza" })
  @IsNumber()
  startingPrice!: number

  @ApiProperty({ description: "Cena kup teraz", required: false })
  @IsOptional()
  @IsNumber()
  buyNowPrice?: number

  @ApiProperty({ description: "Ilość sztuk" })
  @IsInt()
  quantity!: number

  @ApiProperty({ description: "Data zakończenia aukcji", example: "2025-06-30T23:59:00.000Z" })
  @IsDateString()
  auctionEndDate!: Date

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string

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
