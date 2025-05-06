import { Module } from "@nestjs/common"
import { BidsService } from "./bids.service"
import { BidsController } from "./bids.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Bid } from "../entities/bid.entity"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard"
import { UserService } from "../user/user.service"
import { UserModule } from "../user/user.module"

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), UserModule],

  controllers: [BidsController],
  providers: [
    BidsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //@UseGuards(JwtAuthGuard) applied on all API endppints
    },
  ],
})
export class BidsModule {}
