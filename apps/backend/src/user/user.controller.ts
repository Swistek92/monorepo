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
  ForbiddenException,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard"
import { Role } from "@my-monorepo/consts"
import { Roles } from "../auth/decorators/roles.decorator"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger"
import { SafeUserDto, UserDto } from "../auth/dto"
import { CurrentUser } from "../auth/types/current-user"
import { AuthJwtPayload } from "../auth/types/auth-jwtPayload"

@Roles(Role.USER)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiOkResponse({ type: SafeUserDto })
  async getProfile(@Req() req: Request & { user: AuthJwtPayload }): Promise<SafeUserDto | null> {
    const user = await this.userService.findOne(req.user.sub)
    const safeUser = this.userService.sanitizeUser(user) as SafeUserDto
    return user ? safeUser : null
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request & { user: AuthJwtPayload },
  ) {
    const user = req.user
    // console.log("updateUserDto", user)
    const isAdmin = user.roles.some((role) => role === Role.ADMIN)
    const isOwner = user.sub === +id

    if (!isAdmin && !isOwner) {
      throw new Error("You are not allowed to update this user")
    }
    return await this.userService.update(+id, updateUserDto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete("remove/:id")
  remove(@Param("id") id: string, @Req() req: Request & { user: AuthJwtPayload }) {
    const currentUser = req.user
    const targetUserId = +id
    const isOwner = currentUser.sub === targetUserId
    const isAdmin = currentUser.roles.includes(Role.ADMIN)

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException("You can only delete your own account.")
    }

    return this.userService.remove(targetUserId)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get("all")
  async GetAll() {
    const users = await this.userService.findAll()
    const safeUsers = this.userService.sanitizeUser(users)
    return users ? safeUsers : null
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post("active/:id")
  async active(@Param("id") id: string) {
    const user = await this.userService.findOne(+id)
    user.isActive = !user.isActive
    await this.userService.handleActivate(+id, user)
    const safeUser = this.userService.sanitizeUser(user)
    return safeUser
  }
}
