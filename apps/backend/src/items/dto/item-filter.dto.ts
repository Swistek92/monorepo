import { IsOptional, IsString, IsBoolean, IsEnum, IsNumber } from "class-validator"
import { CategoryEnum, OwnerFilter } from "@my-monorepo/consts"
import { Transform, Type } from "class-transformer"

export class ItemFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(CategoryEnum)
  category?: CategoryEnum

  @IsOptional()
  @IsBoolean()
  @Transform(transformToBoolean)
  isAuction?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(transformToBoolean)
  available?: boolean

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMin?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMax?: number

  @IsOptional()
  @IsEnum(OwnerFilter) // ✅ poprawka — enum, nie tablica
  ownerFilter?: OwnerFilter

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ownerId?: number // ✅ nowy field dla backendowego filtrowania
}
function transformToBoolean({ value }: { value: any }) {
  if (value === "true") return true
  if (value === "false") return false
  return value
}
