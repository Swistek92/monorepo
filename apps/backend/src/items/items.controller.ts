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
  Req,
  ForbiddenException,
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"
import { AuthJwtPayload } from "../auth/types/auth-jwtPayload"
import { Request } from "express"

@ApiTags("Items") // Swagger group name
@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * POST /items
   * Tworzy nowy przedmiot.
   * Wymaga autoryzacji (JWT).
   */
  @Post()
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Create new item (auth required)" })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: "Item created successfully.", type: CreatedItemDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async create(
    @Body() createItemDto,
    @Req() req: Request & { user: AuthJwtPayload },
  ): Promise<CreatedItemDto> {
    console.log("item controller called")
    const userid = Number(req.user.sub)
    const item = { ...createItemDto, ownerId: userid } as CreateItemDto
    return this.itemsService.create(item)
    // console.log("created")
    // return aaa
  }

  /**
   * GET /items
   * Zwraca paginowaną listę przedmiotów.
   * Endpoint publiczny.
   */
  @Public()
  @Get()
  @ApiOperation({ summary: "Get all items with pagination (public)" })
  @ApiResponse({
    status: 200,
    description: "List of items returned.",
    type: GetAllItemsResponseDto,
  })
  async findAll(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<GetAllItemsResponseDto> {
    const pagination: PaginationDTO = { skip, limit }
    return this.itemsService.findAll(pagination)
  }

  /**
   * GET /items/:id
   * Pobiera pojedynczy przedmiot na podstawie ID.
   * Endpoint publiczny.
   */
  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Get item by ID (public)" })
  @ApiParam({ name: "id", type: Number, description: "ID of the item to retrieve" })
  @ApiResponse({ status: 200, description: "Item found.", type: CreatedItemDto })
  @ApiResponse({ status: 404, description: "Item not found." })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<CreatedItemDto> {
    return this.itemsService.findOne(id)
  }

  /**
   * PATCH /items/:id
   * Aktualizuje dane przedmiotu.
   * Wymaga autoryzacji (JWT) i roli: właściciel, admin lub moderator.
   */
  @Patch(":id")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Update item by ID (auth required)" })
  @ApiParam({ name: "id", type: Number, description: "ID of the item to update" })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: "Item updated.", type: CreatedItemDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Item not found." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req: Request & { user: AuthJwtPayload },
  ): Promise<CreatedItemDto> {
    const user = req.user
    const isAdmin = user.roles.includes(Role.ADMIN)
    const isModerator = user.roles.includes(Role.MODERATOR)
    const isOwner = user.sub === id

    if (!isAdmin && !isModerator && !isOwner) {
      throw new ForbiddenException("You are not allowed to update this item.")
    }

    return this.itemsService.update(id, updateItemDto)
  }

  /**
   * DELETE /items/:id
   * Usuwa przedmiot. Wymaga roli ADMIN lub MODERATOR.
   */
  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Delete item by ID (auth required)" })
  @ApiParam({ name: "id", type: Number, description: "ID of the item to delete" })
  @ApiResponse({ status: 200, description: "Item deleted.", type: DeleteItemResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Item not found." })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<DeleteItemResponseDto> {
    return this.itemsService.remove(id)
  }
}
