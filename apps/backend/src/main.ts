/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: "http://localhost:4200", // frontend Angular
  })

  // console.log(aaa + "aa")
  const port = process.env.PORT || 3000
  console.log("PORT env port", process.env.PORT)
  console.log("PORT port", port)
  // const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`)
}

bootstrap()
