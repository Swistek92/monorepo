import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { Role } from "@my-monorepo/consts"
import { Review } from "../../entities/rewiew.entity"
import { Item } from "../../entities/item.entity"
import { Bid } from "../../entities/bid.entity"

export class ProfileDto {
  @ApiProperty({ example: 1, description: "Unikalne ID użytkownika" })
  @Expose()
  id: number

  @ApiProperty({
    example: "Jan Kowalski",
    description: "Imię i nazwisko użytkownika",
    nullable: true,
  })
  @Expose()
  name: string | null

  @ApiProperty({ example: "jan.kowalski@example.com", description: "Email użytkownika" })
  @Expose()
  email: string

  @ApiProperty({ example: ["USER"], description: "Role przypisane do użytkownika", isArray: true })
  @Expose()
  roles: Role[]

  @ApiProperty({ example: true, description: "Czy konto użytkownika jest aktywne" })
  @Expose()
  isActive: boolean

  @ApiProperty({ example: false, description: "Czy użytkownik został zweryfikowany" })
  @Expose()
  verified: boolean

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "Avatar użytkownika",
    nullable: true,
  })
  @Expose()
  avatar: string | null

  @ApiProperty({ example: "2025-04-27T10:00:00.000Z", description: "Data utworzenia konta" })
  @Expose()
  createdAt: Date

  @ApiProperty({
    example: "2025-04-27T10:00:00.000Z",
    description: "Data ostatniej aktualizacji konta",
  })
  @Expose()
  updatedAt: Date

  @ApiProperty({
    example: "2025-04-27T12:00:00.000Z",
    description: "Data ostatniego logowania",
    nullable: true,
  })
  @Expose()
  lastLogin: Date | null

  @ApiProperty({
    type: () => [Item],
    description: "Ulubione produkty użytkownika",
    required: false,
  })
  @ApiProperty({ type: () => [Bid], description: "Oferty użytkownika", required: false })
  @Expose()
  bids?: Bid[]

  @ApiProperty({
    type: () => [Item],
    description: "Produkty wystawione przez użytkownika",
    required: false,
  })
  @Expose()
  ownedItems?: Item[]

  @ApiProperty({
    type: () => [Review],
    description: "Recenzje wystawione przez użytkownika",
    required: false,
  })
  @Expose()
  reviews?: Review[]
}
