import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsPositive, IsNotEmpty } from "class-validator"

export class CreateBidDto {
  @ApiProperty({ example: 2, description: "ID przedmiotu" })
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({ example: 150, description: "Kwota oferty" })
  @IsNumber()
  @IsPositive()
  amount: number
}
