import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common"
import { BidsService } from "./bids.service"
import { CreateBidDto } from "./dto/create-bid.dto"
import { UpdateBidDto } from "./dto/update-bid.dto"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"
import { AuthJwtPayload } from "../auth/types/auth-jwtPayload"
import { SafeUserDto } from "../auth/dto"
import { UserService } from "../user/user.service"

@Controller("bids")
export class BidsController {
  constructor(
    private readonly bidsService: BidsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() dto: CreateBidDto, @Req() req: Request & { user: AuthJwtPayload }) {
    const user = await this.resolveSafeUser(req.user.email)
    return this.bidsService.createBid(dto, user)
  }

  @Get(":id")
  findAllForItem(@Param("id") id: string) {
    return this.bidsService.findAllForItem(+id)
  }

  @Patch()
  async update(@Body() updateBidDto: UpdateBidDto, @Req() req: Request & { user: AuthJwtPayload }) {
    const user = await this.resolveSafeUser(req.user.email)
    return this.bidsService.update(updateBidDto, user)
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req: Request & { user: AuthJwtPayload }) {
    const user = await this.resolveSafeUser(req.user.email)
    return this.bidsService.remove(+id, user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("by-admin/:id")
  removeByAdmin(@Param("id") id: string) {
    return this.bidsService.removeByAdmin(+id)
  }

  private async resolveSafeUser(email: string): Promise<SafeUserDto> {
    const userEntity = await this.userService.findByEmail(email)
    return this.userService.sanitizeUser(userEntity) as SafeUserDto
  }
}
