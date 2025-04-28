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
  UseGuards,
} from "@nestjs/common"
import { ItemsService } from "./items.service"
import {
  CreateItemDto,
  UpdateItemDto,
  PaginationDTO,
  GetAllItemsResponseDto,
  CreatedItemDto,
  DeleteItemResponseDto,
} from "./dto"
import { Public } from "../auth/decorators/public.decorator"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger" // <- WAŻNE!
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"

@Public()
@ApiTags("items") // <--- Dodajesz nazwę sekcji w Swaggerze
@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: "Create new item" })
  @ApiResponse({ status: 201, description: "Item created." })
  async create(@Body() createItemDto: CreateItemDto): Promise<CreatedItemDto> {
    return this.itemsService.create(createItemDto)
  }

  @Get()
  @ApiOperation({ summary: "Get all items" })
  @ApiResponse({ status: 200, description: "List of items returned." })
  async findAll(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<GetAllItemsResponseDto> {
    const pagination: PaginationDTO = { skip, limit }
    return this.itemsService.findAll(pagination)
  }

  @Get(":id")
  @ApiOperation({ summary: "Get item by ID" })
  @ApiResponse({ status: 200, description: "Item returned." })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<CreatedItemDto> {
    return this.itemsService.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update item by ID" })
  @ApiResponse({ status: 200, description: "Item updated." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<CreatedItemDto> {
    return this.itemsService.update(id, updateItemDto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Delete(":id")
  @ApiOperation({ summary: "Delete item by ID" })
  @ApiResponse({ status: 200, description: "Item deleted." })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<DeleteItemResponseDto> {
    return this.itemsService.remove(id)
  }
}
