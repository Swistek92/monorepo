import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entities/user.entity"
import { Repository } from "typeorm"
import { ProfileDto } from "./dto/profile.dto"

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken })
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto)
    return await this.UserRepo.save(user)
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {
        email,
      },
    })
  }

  async findAll(): Promise<User[]> {
    return await this.UserRepo.find()
  }

  async findOne(id: number) {
    return this.UserRepo.findOne({
      where: { id },
      relations: ["favorites", "bids", "ownedItems", "reviews"],
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
  sanitizeUser(input: User | User[]): ProfileDto | ProfileDto[] {
    const sanitize = (user: User): ProfileDto => {
      const { password, hashedRefreshToken, ...safeUser } = user
      return safeUser as ProfileDto
    }

    return Array.isArray(input) ? input.map(sanitize) : sanitize(input)
  }
}
