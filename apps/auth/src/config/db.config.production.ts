import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as path from "path"

export default (): PostgresConnectionOptions => ({
  // Don't put this here, Instead put in the env file
  url: process.env.DB_URL,
  type: "postgres",
  port: +process.env.DB_PORT,
  entities: [path.resolve(__dirname, "..") + "/**/*.entity{.ts,.js}"],

  synchronize: false,
})
