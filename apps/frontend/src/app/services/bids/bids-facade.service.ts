import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { BidsService } from "./bids.service"
import { Bid, CreateBidInput, CreateBidPayload, DeleteBidInput } from "apps/frontend/types/types"
// import {  } from "@my-monorepo/consts"

@Injectable({
  providedIn: "root",
})
export class BidsFacadeService {
  constructor(private bidsService: BidsService) {}

  // 🔍 Pobierz oferty dla konkretnego produktu
  getBidsByProduct(productId: number): Observable<Bid[]> {
    return this.bidsService.getBidsByProduct(productId)
  }

  // ➕ Dodaj nową ofertę
  createBid(payload: CreateBidInput): Observable<Bid> {
    return this.bidsService.createBid(payload)
  }

  // ❌ Usuń ofertę
  deleteBid(id: number): Observable<{ message: string }> {
    return this.bidsService.deleteBid(id)
  }
}
