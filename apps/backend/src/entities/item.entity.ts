import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm"
import { User } from "./user.entity"
import { Review } from "./rewiew.entity"
import { Bid } from "./bid.entity"

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 0 })
  rating: number | null

  @Column({ default: 0 })
  views: number

  @Column()
  name: string

  @Column({
    default:
      "https://media.sketchfab.com/models/4bdae44017424870b1759db195618576/thumbnails/332515a54cb242948ab45fe368a63e69/7ee040f9cb6b4f12a383ea299bc9b0bf.jpeg",
  })
  image: string

  @Column("decimal")
  startingPrice: number // cena wywoławcza

  @Column("decimal", { nullable: true })
  buyNowPrice: number | null // cena kup teraz (opcjonalna)

  @Column("int", { default: 1 })
  quantity: number // liczba sztuk dostępnych

  @Column({ type: "timestamp" })
  auctionEndDate: Date // data zakończenia licytacji

  @ManyToOne(() => User, (user) => user.ownedItems)
  @JoinColumn({ name: "ownerId" })
  owner: User

  @Column()
  ownerId: number

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date // automatycznie ustawiana przez TypeORM

  @Column()
  category: string

  @Column({ default: true })
  available: boolean

  @Column("simple-array")
  tags: string[]

  @Column()
  location: string

  @ManyToMany(() => User, (user) => user.favorites)
  likedBy: User[]

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[]

  @OneToMany(() => Bid, (bid) => bid.product)
  bids: Bid[]
}
