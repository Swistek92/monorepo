import { basebackendUrl } from "@my-monorepo/consts"

export const UserEndpoints = {
  // 🔐 Auth
  login: () => `${basebackendUrl}/auth/login`,
  register: () => `${basebackendUrl}/auth/register`,
  refreshToken: () => `${basebackendUrl}/auth/refresh`,
  signout: () => `${basebackendUrl}/auth/signout`,

  // 👤 User
  me: () => `${basebackendUrl}/user/profile`,
  getAll: () => `${basebackendUrl}/user/all`,
  update: (id: number) => `${basebackendUrl}/user/${id}`,
  delete: (id: number) => `${basebackendUrl}/user/remove/${id}`,
  handleActivUser: (id: number) => `${basebackendUrl}/user/active/${id}`,
}
