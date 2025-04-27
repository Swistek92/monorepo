import { Role } from "../enums/role.enum"

type CurrentUser = {
  id: number
  roles: Role[]
}
