import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcrypt"
import { UserService } from "../user/user.service"
import { AuthJwtPayload } from "./types/auth-jwtPayload"
import refreshJwtConfig from "./config/refresh-jwt.config"
import { ConfigType } from "@nestjs/config"
import * as argon2 from "argon2"
import { CurrentUser } from "./types/current-user"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { Role } from "./enums/role.enum"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException("User not found!")
    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) throw new UnauthorizedException("Invalid credentials")
    if (!user.isActive) throw new UnauthorizedException("User is not active!")
    console.log("User roles:", user.roles) // Debugging line
    return { id: user.id, roles: user.roles }
  }

  async login(userId: number, roles: Role[]) {
    const { accessToken, refreshToken } = await this.generateTokens(userId, roles)
    const hashedRefreshToken = await argon2.hash(refreshToken)
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
    return {
      id: userId,
      roles,
      accessToken,
      refreshToken,
    }
  }
  async generateTokens(userId: number, roles: Role[]) {
    const payload: AuthJwtPayload = { sub: userId, roles }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ])
    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(userId: number) {
    const user = await this.userService.findOne(userId)
    if (!user) throw new UnauthorizedException("User not found")

    const { accessToken, refreshToken } = await this.generateTokens(userId, user.roles)
    const hashedRefreshToken = await argon2.hash(refreshToken)
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
    return {
      id: userId,
      roles: user.roles,
      accessToken,
      refreshToken,
    }
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId)
    if (!user || !user.hashedRefreshToken) throw new UnauthorizedException("Invalid Refresh Token")

    const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken)
    if (!refreshTokenMatches) throw new UnauthorizedException("Invalid Refresh Token")

    return { id: userId }
  }

  async signOut(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, null)
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId)
    if (!user) throw new UnauthorizedException("User not found!")
    const currentUser: CurrentUser = { id: user.id, roles: user.roles }
    return currentUser
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email)
    if (user) return user
    return await this.userService.create(googleUser)
  }
}
