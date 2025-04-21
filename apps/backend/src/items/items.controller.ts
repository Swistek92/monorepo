import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common"
import { ItemsService } from "./items.service"
import {
  CreateItemDto,
  UpdateItemDto,
  PaginationDTO,
  GetAllItemsResponse,
  CreatedItemDto,
  DeleteItemResponse,
} from "@my-monorepo/consts"
import { Public } from "../auth/decorators/public.decorator"

@Public()
@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<CreatedItemDto> {
    return this.itemsService.create(createItemDto)
  }

  // GET /items?skip=10&limit=5
  @Get()
  async findAll(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<GetAllItemsResponse> {
    const pagination: PaginationDTO = { skip, limit }
    const allItems = await this.itemsService.findAll(pagination)
    return allItems
  }
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<CreatedItemDto> {
    const item = await this.itemsService.findOne(id)
    return item
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<CreatedItemDto> {
    return this.itemsService.update(id, updateItemDto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<DeleteItemResponse> {
    return this.itemsService.remove(id)
  }
}
