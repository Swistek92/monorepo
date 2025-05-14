import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDate,
  IsInt,
  IsEnum,
} from "class-validator"
import { CategoryEnum } from "@my-monorepo/consts"

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

  @ApiProperty({ description: "Czy jest to licytacja (true) czy kup teraz (false)", default: true })
  @IsBoolean()
  isAuction!: boolean

  @ApiProperty({ description: "Cena wywoławcza" })
  @IsNumber()
  startingPrice!: number

  @ApiProperty({ description: "Cena kup teraz", required: false })
  @IsOptional()
  @IsNumber()
  buyNowPrice?: number

  @IsInt()
  @Type(() => Number)
  @ApiHideProperty()
  ownerId: number

  @ApiProperty({ description: "Ilość sztuk" })
  @IsInt()
  quantity!: number

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) =>
    value ? new Date(value) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  )
  auctionEndDate!: Date

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string

  @ApiProperty({ enum: CategoryEnum })
  @IsEnum(CategoryEnum)
  category!: CategoryEnum

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

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  rating?: number = 0

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  views?: number = 0
}
