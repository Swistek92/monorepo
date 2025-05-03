/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger" // <-- dodaj Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: "*",
  })
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     const allowed = ["http://localhost:4200", "https://monorepo-alpha-ivory.vercel.app"]
  //     if (!origin || allowed.includes(origin)) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error("Not allowed by CORS"))
  //     }
  //   },
  // })
  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("api", app, documentFactory)

  // console.log(aaa + "aa")

  // const port = process.env.PORT || 3000
  const port = 3000
  // const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`)
}

bootstrap()
