import { basebackendUrl } from "@my-monorepo/consts"

// const basebackendUrl = "/api"
export const AuthEndpoints = {
  login: () => `${basebackendUrl}/auth/login`,
}
