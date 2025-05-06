import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as path from "path"
import { registerAs } from "@nestjs/config"

console.log("Connecting to database...")
console.log("DB_URL:", process.env.DB_URL)
console.log("DB_PORT:", process.env.DB_PORT)

export default registerAs(
  "dbconfig.dev",
  (): PostgresConnectionOptions => ({
    // Don't put this here, Instead put in the env file
    url: "postgresql://neondb_owner:npg_R2efQpAa1EzN@ep-floral-hat-a4yyxdfy-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
    type: "postgres",
    port: 3305,
    entities: [path.resolve(__dirname, "..") + "/**/*.entity{.ts,.js}"],

    synchronize: true,
  }),
)
