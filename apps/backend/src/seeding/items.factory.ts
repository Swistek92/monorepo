import { faker } from "@faker-js/faker"
import { setSeederFactory } from "typeorm-extension"
import { Item } from "../entities/item.entity"
import { CategoryEnum } from "@my-monorepo/consts"

export const ItemFactory = setSeederFactory(Item, () => {
  const item = new Item()

  item.name = faker.commerce.productName()
  item.image = faker.image.urlPicsumPhotos()
  item.description = faker.lorem.paragraph()
  item.createdAt = faker.date.past()
  item.category = faker.helpers.arrayElement(Object.values(CategoryEnum))
  item.available = faker.datatype.boolean()
  item.views = 0
  item.rating = 0
  item.tags = faker.helpers.arrayElements(["new", "popular", "unisex", "limited"], 2)
  item.location = faker.location.city()

  item.startingPrice = parseFloat(faker.commerce.price({ min: 50, max: 200 }))
  item.buyNowPrice = faker.datatype.boolean()
    ? parseFloat(faker.commerce.price({ min: 200, max: 500 }))
    : null
  item.quantity = faker.number.int({ min: 1, max: 10 })
  item.auctionEndDate = faker.date.soon({ days: 10 })

  return item
})
