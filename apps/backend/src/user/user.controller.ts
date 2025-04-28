import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard"
import { Role } from "@my-monorepo/consts"
import { Roles } from "../auth/decorators/roles.decorator"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger"
import { ProfileDto } from "./dto/profile.dto"

@Roles(Role.USER)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiOkResponse({ type: ProfileDto })
  async getProfile(@Req() req): Promise<ProfileDto | null> {
    const user = await this.userService.findOne(req.user.id)
    if (user) {
      const { password, ...safeUser } = user
      return safeUser as ProfileDto
    }
    return null
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }
  // @SetMetadata('role', [Role.ADMIN])
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id)
  }
}
