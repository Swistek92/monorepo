/* eslint-disable @nx/enforce-module-boundaries */
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginDto {
  @ApiProperty({
    example: "admin@example.com",
    description: "Adres email użytkownika",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: "strongPassword123",
    description: "Hasło użytkownika",
  })
  @IsString()
  password: string
}
