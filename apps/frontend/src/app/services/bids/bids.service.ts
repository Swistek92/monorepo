import { Injectable } from "@angular/core"
import { ApiService } from "../api.service"
import { EndpointsService } from "../endpoints.service"
// import { Bid, CreateBidPayload } from "@my-monorepo/consts"
import { Observable } from "rxjs"
import { Bid, CreateBidInput, CreateBidPayload, DeleteBidInput } from "apps/frontend/types/types"
import { BidEndpoints } from "@my-monorepo/consts"

@Injectable({ providedIn: "root" })
export class BidsService {
  constructor(
    private api: ApiService,
    private endpoints: EndpointsService,
  ) {}

  getBidsByProduct(productId: number): Observable<Bid[]> {
    return this.api.get<Bid[]>(BidEndpoints.findAllForItem(productId), {})
  }

  createBid(bid: CreateBidInput): Observable<Bid> {
    // return this.api.post<Bid>(this.endpoints.createBid(), bid, {})
    return this.api.post<Bid>(BidEndpoints.create(), bid, {})
  }

  deleteBid(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(BidEndpoints.remove(id), {})
  }

  deleteByAdmin(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(BidEndpoints.removeByAdmin(id), {})
  }
}
