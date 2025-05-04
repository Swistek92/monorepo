import { Component, Input, OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { BidsFacadeService } from "../../../services/bids/bids-facade.service"
import { ButtonModule } from "primeng/button"
import { InputNumberModule } from "primeng/inputnumber"
import { AuthFacadeService } from "../../../services/user-auth/auth-facade.service"
import { Bid, CreateBidInput, SafeUser } from "apps/frontend/types/types"
import { AuthStoreService } from "../../../services/user-auth/auth-store.service"

@Component({
  selector: "app-bids",
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: "./bids.component.html",
  styleUrls: ["./bids.component.scss"],
})
export class BidsComponent implements OnInit {
  @Input() productId!: number
  @Input() productPrice!: number

  bids: Bid[] = []
  newBidAmount: number | null = null
  loading = false
  maxPrice!: number

  private bidsFacade = inject(BidsFacadeService)
  private authFacade = inject(AuthFacadeService)
  currentUser: SafeUser | null = null

  get isActiveUser(): boolean {
    return this.authFacade.isLoggedIn() && this.authFacade.isActive()
  }

  ngOnInit(): void {
    this.currentUser = this.authFacade.getUser()
    if (this.productId && this.productPrice != null) {
      this.maxPrice = this.productPrice
      this.fetchBids()
    }
    console.log("Current user:", this.currentUser)
  }

  fetchBids(): void {
    this.loading = true
    this.bidsFacade.getBidsByProduct(this.productId).subscribe({
      next: (bids) => {
        console.log("Bids:", bids)
        this.bids = bids.sort((a, b) => b.amount - a.amount)
        if (this.bids.length > 0) {
          this.maxPrice = Math.max(this.productPrice, this.bids[0].amount)
        }
        this.loading = false
      },
      error: () => (this.loading = false),
    })
  }

  placeBid(): void {
    if (!this.isActiveUser) return

    if (this.newBidAmount == null || this.newBidAmount <= this.maxPrice) {
      return
    }

    const user = this.authFacade.getUser()
    if (!user) return

    const payload: CreateBidInput = {
      id: this.productId,
      amount: this.newBidAmount,
    }

    this.bidsFacade.createBid(payload).subscribe({
      next: () => {
        this.newBidAmount = null
        this.fetchBids()
      },
    })
  }

  deleteBid(id: number): void {
    this.bidsFacade.deleteBid(id).subscribe(() => this.fetchBids())
  }
}
