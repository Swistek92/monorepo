import { basebackendUrl } from "@my-monorepo/consts"

export const BidEndpoints = {
  /** POST /bids */
  create: () => `${basebackendUrl}/bids`,

  /** GET /bids/:id */
  findAllForItem: (id: number | string) => `${basebackendUrl}/bids/${id}`,

  /** PATCH /bids */
  update: () => `${basebackendUrl}/bids`,

  /** DELETE /bids */
  remove: (id: number) => `${basebackendUrl}/bids/${id}`,

  /** DELETE /bids/by-admin */
  removeByAdmin: (id: number) => `${basebackendUrl}/bids/by-admin/${id}`,
}
