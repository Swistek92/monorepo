import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Item } from "../entities/item.entity"
import {
  CreateItemDto,
  UpdateItemDto,
  PaginationDTO,
  CreatedItemDto,
  GetAllItemsResponse,
  DeleteItemResponse,
} from "@my-monorepo/consts"
import { DEFAULT_PAGE_SIZE } from "@my-monorepo/consts"

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<CreatedItemDto> {
    const newItem = this.itemRepo.create(createItemDto)
    const saved = await this.itemRepo.save(newItem)
    return this.mapToDto(
      await this.itemRepo.findOne({
        where: { id: saved.id },
        relations: ["owner"],
      }),
    )
  }

  async findAll(paginationDTO: PaginationDTO): Promise<GetAllItemsResponse> {
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
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ["owner"], // 👈 dołącz relację owner
    })
    if (!item) throw new NotFoundException("Item not found")
    return this.mapToDto(item)
  }

  async update(id: number, updateDto: UpdateItemDto): Promise<CreatedItemDto> {
    const result = await this.itemRepo.update({ id }, updateDto)
    if (result.affected === 0) throw new NotFoundException("Item not found")
    return this.findOne(id)
  }

  async remove(id: number): Promise<DeleteItemResponse> {
    const result = await this.itemRepo.delete({ id })
    if (result.affected === 0) throw new NotFoundException("Item not found")
    return { success: true, message: "Item deleted successfully" }
  }

  private mapToDto = (item: Item): CreatedItemDto => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      price: Number(item.price),
      description: item.description,
      createdAt: item.createdAt,
      category: item.category,
      available: item.available,
      tags: item.tags,
      location: item.location,
      ownerId: item.ownerId,
      rating: item.rating,
      views: item.views,
      ownerEmail: item.owner?.email || "",
    }
  }
}
