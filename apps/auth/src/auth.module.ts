import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UserService } from "./user/user.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtModule } from "@nestjs/jwt"
import jwtConfig from "./config/jwt.config"
import { ConfigModule } from "@nestjs/config"
import { JwtStrategy } from "./strategies/jwt.strategy"
import refreshJwtConfig from "./config/refresh-jwt.config"
import { RefreshJwtStrategy } from "./strategies/refresh.strategy"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "./guards/jwt-auth/jwt-auth.guard"
import { RolesGuard } from "./guards/roles/roles.guard"
import googleOauthConfig from "./config/google-oauth.config"
import { GoogleStrategy } from "./strategies/google.strategy"
import dbConfig from "./config/db.config"
import dbConfigProduction from "./config/db.config.production"
import { UserModule } from "./user/user.module"

@Module({
  imports: [
    UserModule,

    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig, dbConfigProduction],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === "production" ? dbConfigProduction : dbConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //@UseGuards(JwtAuthGuard) applied on all API endppints
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
