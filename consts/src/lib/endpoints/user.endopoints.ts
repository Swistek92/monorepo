import { basebackendUrl } from "@my-monorepo/consts"

// const basebackendUrl = "/api"
export const UserEndpoints = {
  login: () => `${basebackendUrl}/user/profile`,
}
