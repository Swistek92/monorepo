import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Item } from "../entities/item.entity"
import {
  CreateItemDto,
  UpdateItemDto,
  PaginationDTO,
  CreatedItemDto,
  GetAllItemsResponseDto,
  DeleteItemResponseDto,
} from "./dto"
import { DEFAULT_PAGE_SIZE } from "@my-monorepo/consts"

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<CreatedItemDto> {
    console.log("createItemDto111111111", createItemDto)
    const newItem = this.itemRepo.create(createItemDto)
    const saved = await this.itemRepo.save(newItem)
    if (!saved) throw new NotFoundException("Item not found")
    console.log("saved", saved)

    const fullItem = await this.itemRepo.findOne({
      where: { id: saved.id },
      relations: ["owner"],
    })
    console.log("fullItem", fullItem)
    return this.mapToDto(fullItem)
  }

  async findAll(paginationDTO: PaginationDTO): Promise<GetAllItemsResponseDto> {
    const { skip = 0, limit } = paginationDTO
    const take = typeof limit === "number" && limit > 0 ? limit : DEFAULT_PAGE_SIZE
    const [items, total] = await this.itemRepo.findAndCount({
      skip,
      take,
      relations: ["owner"], // 👈 dołącz relację owner
    })

    return {
      items: items.map(this.mapToDto),
      total,
    }
  }

  async findOne(id: number): Promise<CreatedItemDto> {
    const fullItem = await this.itemRepo.findOne({
      where: { id },
      relations: ["owner"],
    })
    if (!fullItem) throw new NotFoundException("Created item not found")
    return this.mapToDto(fullItem)
  }

  async update(id: number, updateDto: UpdateItemDto): Promise<CreatedItemDto> {
    const result = await this.itemRepo.update({ id }, updateDto)
    if (result.affected === 0) throw new NotFoundException("Item not found")
    return this.findOne(id)
  }

  async remove(id: number): Promise<DeleteItemResponseDto> {
    const result = await this.itemRepo.delete({ id })
    if (result.affected === 0) throw new NotFoundException("Item not found")
    return { success: true, message: "Item deleted successfully" }
  }

  private mapToDto = (item: Item): CreatedItemDto => {
    const { owner, ...rest } = item

    return {
      ...rest,
      createdAt: item.createdAt.toISOString(),
      startingPrice: Number(item.startingPrice),
      buyNowPrice: item.buyNowPrice,
      quantity: item.quantity,
      auctionEndDate: item.auctionEndDate.toISOString(),
      ownerEmail: owner?.email || "",
    }
  }
}
