import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { User } from "../entities/user.entity"
import { Item } from "../entities/item.entity"
import { Role } from "../auth/enums/role.enum"
import { faker } from "@faker-js/faker"

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepo = dataSource.getRepository(User)

    // 1. Seedujemy ręcznie użytkowników
    const usersToInsert = [
      {
        id: 1,
        email: "admin@example.com",
        password: "admin",
        name: "Admin",
        roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
        isActive: true,
        verified: true,
        avatar: "assets/avatars/admin.png",
        createdAt: new Date("2024-04-01T12:00:00Z"),
        lastLogin: new Date("2024-04-03T15:30:00Z"),
      },
      {
        id: 2,
        email: "newuser@example.com",
        password: "secret123",
        name: "New User",
        role: [Role.USER],
        isActive: true,
        verified: false,
        avatar: "assets/avatars/default.png",
        createdAt: new Date("2024-04-02T08:30:00Z"),
        lastLogin: null,
      },
    ]

    const insertedUsers: User[] = []

    for (const userData of usersToInsert) {
      const user = userRepo.create(userData)
      insertedUsers.push(await userRepo.save(user))
    }

    console.log("✅ Seeded users")

    // 2. Fabryka dla itemów
    const itemFactory = factoryManager.get(Item)

    console.log("🎲 Generating items...")

    const items = await Promise.all(
      Array(50)
        .fill(null)
        .map(async () => {
          return await itemFactory.make({
            owner: faker.helpers.arrayElement(insertedUsers),
          })
        }),
    )

    const itemRepo = dataSource.getRepository(Item)
    await itemRepo.save(items)

    console.log("✅ Seeded 50 items")
  }
}
