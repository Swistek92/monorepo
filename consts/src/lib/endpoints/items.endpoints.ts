// import { basebackendUrl } from "@my-monorepo/consts"

const basebackendUrl = "/api"
export const ItemsEndpoints = {
  getAll: (skip = 0, limit = 10) => `${basebackendUrl}/items?skip=${skip}&limit=${limit}`,
  getById: (id: number) => `${basebackendUrl}/items/${id}`,
  create: () => `${basebackendUrl}/items`,
  update: (id: number) => `${basebackendUrl}/items/${id}`,
  delete: (id: number) => `${basebackendUrl}/items/${id}`,
}
