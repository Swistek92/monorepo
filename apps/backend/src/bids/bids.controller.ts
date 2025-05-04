import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common"
import { BidsService } from "./bids.service"
import { CreateBidDto } from "./dto/create-bid.dto"
import { UpdateBidDto } from "./dto/update-bid.dto"
import { CurrentUser } from "../auth/types/current-user"
import { SafeUserDto } from "../auth/dto"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"

@Controller("bids")
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Body() dto: CreateBidDto, @Req() req: Request & { user: CurrentUser }) {
    const user = req.user.user as SafeUserDto
    return this.bidsService.createBid(dto, user)
  }

  @Get(":id")
  findAllForItem(@Param("id") id: string) {
    return this.bidsService.findAllForItem(+id)
  }

  @Patch()
  update(@Body() updateBidDto: UpdateBidDto, @Req() req: Request & { user: CurrentUser }) {
    const user = req.user.user as SafeUserDto

    return this.bidsService.update(updateBidDto, user)
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request & { user: CurrentUser }) {
    const user = req.user.user as SafeUserDto
    return this.bidsService.remove(+id, user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("by-admin/:id")
  removeByAdmin(@Param("id") id: string) {
    return this.bidsService.removeByAdmin(+id)
  }
}
