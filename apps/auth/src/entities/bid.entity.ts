import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./user.entity"
import { Item } from "./item.entity"

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Item, (item) => item.bids)
  @JoinColumn({ name: "productId" })
  product: Item

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: "userId" })
  user: User

  @Column("decimal")
  amount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdate: Date

  @Column()
  userId: number
  @Column()
  userName: string

  @Column()
  userEmail: string

  @Column({ nullable: true })
  userAvatar: string
}
