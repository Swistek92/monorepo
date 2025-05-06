import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateBidDto } from "./dto/create-bid.dto"
import { UpdateBidDto } from "./dto/update-bid.dto"
import { Repository } from "typeorm"
import { Bid } from "../entities/bid.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { SafeUserDto } from "../auth/dto"

@Injectable()
export class BidsService {
  constructor(@InjectRepository(Bid) private bidRepo: Repository<Bid>) {}

  async createBid(dto: CreateBidDto, user: SafeUserDto): Promise<Bid> {
    console.log(user)
    const bid = this.bidRepo.create({
      amount: dto.amount,
      product: { id: dto.id },
      user: { id: user.id },
      userName: user.name,
      userEmail: user.email,
      userAvatar: user.avatar,
      userId: user.id,
    })

    return await this.bidRepo.save(bid)
  }

  async findAllForItem(itemId: number): Promise<Bid[]> {
    return this.bidRepo.find({
      where: { product: { id: itemId } },
      relations: ["user", "product"], // jeśli chcesz pełne dane
      order: { createdAt: "DESC" }, // opcjonalnie sortowanie
    })
  }

  async findOne(id: number) {
    const bid = await this.bidRepo.findOne({
      where: { id },
      relations: ["user"],
    })
    if (!bid) {
      throw new NotFoundException("Bid not found")
    }

    return bid
  }

  async update(updateBidDto: UpdateBidDto, user: SafeUserDto) {
    const bid = await this.findOne(updateBidDto.id)

    if (bid.user.id !== user.id) {
      throw new ForbiddenException("You cannot update not your own bid")
    }

    return this.bidRepo.update(
      { id: updateBidDto.id },
      {
        amount: updateBidDto.amount,
      },
    )
  }

  async remove(id: number, user: SafeUserDto): Promise<void> {
    const bid = await this.findOne(id)

    if (bid.user.id !== user.id) {
      throw new ForbiddenException("You cannot delete someone else's bid")
    }

    await this.bidRepo.delete(id)
  }

  async removeByAdmin(id: number) {
    await this.bidRepo.delete(id)
  }
}
