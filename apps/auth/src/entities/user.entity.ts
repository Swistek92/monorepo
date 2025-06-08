import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import * as bcrypt from "bcrypt"
// import { Role } from "@my-monorepo/consts"
import { Item } from "./item.entity"
import { Bid } from "./bid.entity"
import { Review } from "./rewiew.entity"

export enum Role {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  roles: Role[]

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  verified: boolean

  @Column({
    nullable: true,
    default: "https://rapidapi-prod-apis.s3.amazonaws.com/b42aa17d-8ae0-4a28-b29f-587af5454390.png",
  })
  avatar: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  lastLogin: Date

  @Column({ nullable: true })
  hashedRefreshToken: string

  // ✅ Ulubione produkty
  @ManyToMany(() => Item, (item) => item.likedBy)
  @JoinTable({ name: "user_favorites" })
  favorites: Item[]

  // ✅ Oferty użytkownika (bids)
  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[]

  // ✅ Wystawione przedmioty
  @OneToMany(() => Item, (item) => item.owner)
  ownedItems: Item[]

  // ✅ Recenzje użytkownika
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
