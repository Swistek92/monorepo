import { faker } from "@faker-js/faker" // ✅ DOBRZE!
import { setSeederFactory } from "typeorm-extension"
import { Item } from "../entities/item.entity"

export const ItemFactory = setSeederFactory(Item, () => {
  const item = new Item()

  item.name = faker.commerce.productName()
  item.image = faker.image.urlPicsumPhotos()
  item.price = +faker.commerce.price({ min: 50, max: 5000 })
  item.description = faker.lorem.paragraph()
  item.createdAt = faker.date.past()
  item.category = faker.commerce.department()
  item.available = faker.datatype.boolean()
  item.views = 0
  item.rating = 0
  item.tags = faker.helpers.arrayElements(["new", "popular", "unisex", "limited"], 2)
  item.location = faker.location.city()

  return item
})
