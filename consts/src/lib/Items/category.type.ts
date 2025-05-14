export enum CategoryEnum {
  CARS = "cars",
  COMPUTERS = "computers",
  BOOKS = "books",
  FASHION = "fashion",
  TOOLS = "tools",
  OTHERS = "others",
}

export enum OwnerFilter {
  ALL = "all",
  OWN = "own",
  OTHERS = "others",
}

export interface ItemFilter {
  name?: string
  category?: CategoryEnum
  isAuction?: boolean
  available?: boolean
  location?: string
  priceMin?: number
  priceMax?: number
  ownerFilter?: OwnerFilter
  ownerId?: number
}
