import { baseAuthUrl } from "@my-monorepo/consts"

export const UserEndpoints = {
  // 🔐 Auth
  login: () => `${baseAuthUrl}/auth/login`,
  register: () => `${baseAuthUrl}/auth/register`,
  refreshToken: () => `${baseAuthUrl}/auth/refresh`,
  signout: () => `${baseAuthUrl}/auth/signout`,

  // 👤 User
  me: () => `${baseAuthUrl}/user/profile`,
  getAll: () => `${baseAuthUrl}/user/all`,
  update: (id: number) => `${baseAuthUrl}/user/${id}`,
  delete: (id: number) => `${baseAuthUrl}/user/remove/${id}`,
  handleActivUser: (id: number) => `${baseAuthUrl}/user/active/${id}`,
}
