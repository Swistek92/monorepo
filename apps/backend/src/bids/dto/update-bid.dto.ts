import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsPositive, IsNotEmpty } from "class-validator"

export class UpdateBidDto {
  @ApiProperty({ example: 2, description: "ID przedmiotu" })
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({ example: 150, description: " nowa Kwota oferty" })
  @IsNumber()
  @IsPositive()
  amount: number

  @ApiProperty({ example: 10, description: "bid id" })
  @IsNumber()
  @IsPositive()
  bidId: number
}
