import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PaginationDTO } from './dto/pagination.dto';
export const DEFAULT_PAGE_SIZE = 10;
// import { API_URL } from '@my-monorepo/consts';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>
  ) {}
  async create(createItemDto: CreateItemDto) {
    const newItem = this.itemRepo.create(createItemDto);
    // console.log('API_URL', API_URL);
    return await this.itemRepo.save(newItem);
  }
  async findAll(paginationDTO: PaginationDTO) {
    return await this.itemRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
    });
  }
  async findOne(id: number) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }
  async update(id: number, updateDto: UpdateItemDto) {
    const result = await this.itemRepo.update({ id }, updateDto);
    if (result.affected === 0) throw new NotFoundException('Item not found');
    return this.findOne(id);
  }
  async remove(id: number) {
    const result = await this.itemRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException('Item not found');
    return { deleted: true };
  }
}
