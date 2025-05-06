import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { ItemsController } from "./items.controller"
import { ItemsService } from "./items.service"
import { Item } from "../entities/item.entity"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard"

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //@UseGuards(JwtAuthGuard) applied on all API endppints
    },
  ],
})
export class ItemsModule {}
