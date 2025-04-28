import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@my-monorepo/consts"
import { Review } from "../../entities/rewiew.entity"
import { Item } from "../../entities/item.entity"
import { Bid } from "@my-monorepo/consts"

export class ProfileDto {
  @ApiProperty({ example: 1, description: "Unikalne ID użytkownika" })
  id: number

  @ApiProperty({
    example: "Jan Kowalski",
    description: "Imię i nazwisko użytkownika",
    nullable: true,
  })
  name: string | null

  @ApiProperty({ example: "jan.kowalski@example.com", description: "Email użytkownika" })
  email: string

  @ApiProperty({ example: ["USER"], description: "Role przypisane do użytkownika", isArray: true })
  roles: Role[]

  @ApiProperty({ example: true, description: "Czy konto użytkownika jest aktywne" })
  isActive: boolean

  @ApiProperty({ example: false, description: "Czy użytkownik został zweryfikowany" })
  verified: boolean

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "Avatar użytkownika",
    nullable: true,
  })
  avatar: string | null

  @ApiProperty({ example: "2025-04-27T10:00:00.000Z", description: "Data utworzenia konta" })
  createdAt: Date

  @ApiProperty({
    example: "2025-04-27T10:00:00.000Z",
    description: "Data ostatniej aktualizacji konta",
  })
  updatedAt: Date

  @ApiProperty({
    example: "2025-04-27T12:00:00.000Z",
    description: "Data ostatniego logowania",
    nullable: true,
  })
  lastLogin: Date | null

  // @ApiProperty({
  //   type: () => [Item],
  //   description: "Ulubione produkty użytkownika",
  //   required: false,
  // })
  // favorites?: Item[]
  // // @ts-expect-error
  // @ApiProperty({ type: () => [Bid], description: "Oferty użytkownika", required: false })
  // bids?: Bid[]

  // @ApiProperty({
  //   type: () => [Item],
  //   description: "Produkty wystawione przez użytkownika",
  //   required: false,
  // })
  // ownedItems?: Item[]

  // @ApiProperty({
  //   type: () => [Review],
  //   description: "Recenzje wystawione przez użytkownika",
  //   required: false,
  // })
  // reviews?: Review[]
}
