import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsInt, Min, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreatedItemDto } from "./created-item.dto"

export class GetAllItemsResponseDto {
  @ApiProperty({ type: [CreatedItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatedItemDto)
  items: CreatedItemDto[]

  @ApiProperty()
  @IsInt()
  @Min(0)
  total: number
}
