import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entities/user.entity"
import { Repository } from "typeorm"
import { SafeUserDto } from "../auth/dto"

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken })
  }

  async create(createUserDto: CreateUserDto) {
    const existing = await this.findByEmail(createUserDto.email)
    if (existing) throw new ConflictException("Email is already registered")

    const user = this.UserRepo.create(createUserDto)
    return await this.UserRepo.save(user)
  }

  async findByEmail(email: string) {
    const user = await this.UserRepo.findOne({
      where: {
        email,
      },
    })
    return user
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

  async handleActivate(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(+id)
    if (!existingUser) throw new NotFoundException()

    existingUser.isActive = !existingUser.isActive

    return await this.UserRepo.save(existingUser)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<SafeUserDto> {
    const user = await this.UserRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException(`User with ID ${id} not found`)

    Object.assign(user, updateUserDto)
    const updated = await this.UserRepo.save(user)

    return this.sanitizeUser(updated) as SafeUserDto
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.UserRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException(`User with ID ${id} not found`)

    await this.UserRepo.remove(user)
    return { message: `User with ID ${id} removed successfully` }
  }

  sanitizeUser(input: User | User[]): SafeUserDto | SafeUserDto[] {
    const sanitize = (user: User): SafeUserDto => {
      const { password, hashedRefreshToken, ...safeUser } = user
      return safeUser as SafeUserDto
    }

    return Array.isArray(input) ? input.map(sanitize) : sanitize(input)
  }
}
