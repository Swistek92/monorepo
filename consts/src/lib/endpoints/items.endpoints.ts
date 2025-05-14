import { basebackendUrl } from "@my-monorepo/consts"

// const basebackendUrl = "/api"
export const ItemsEndpoints = {
  getAll: () => `${basebackendUrl}/items/`,
  getById: (id: number) => `${basebackendUrl}/items/${id}`,
  create: () => `${basebackendUrl}/items`,
  update: (id: number) => `${basebackendUrl}/items/${id}`,
  delete: (id: number) => `${basebackendUrl}/items/${id}`,
}
