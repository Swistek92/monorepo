import { Role } from "../enums/role.enum"

export type AuthJwtPayload = {
  sub: number
  roles: Role[]
}
