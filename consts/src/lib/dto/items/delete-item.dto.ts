/* eslint-disable @nx/enforce-module-boundaries */
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString } from "class-validator"

export class DeleteItemResponse {
  @ApiProperty()
  @IsBoolean()
  success: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message?: string
}
