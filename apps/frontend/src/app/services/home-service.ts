import { Injectable } from "@angular/core"
import { ClothesFacadeService } from "./products/products-facade.service"
import { CreatedItem, CreateItem, PopupMode } from "../../../types/types"
import { Observable } from "rxjs"
import { promise } from "zod"
@Injectable({ providedIn: "root" })
export class HomeService {
  selectedProduct: CreatedItem = this.emptyProduct()
  popupMode: PopupMode = null

  constructor(private facade: ClothesFacadeService) {}

  get displayPopup(): boolean {
    return this.popupMode !== null
  }

  get popupTitle(): string {
    return this.popupMode === "edit" ? "Edit Product" : "Add Product"
  }

  openAdd() {
    this.selectedProduct = this.emptyProduct()
    this.popupMode = "add"
  }

  openEdit(product: CreatedItem) {
    this.selectedProduct = product
    this.popupMode = "edit"
  }

  cancelPopup() {
    this.popupMode = null
  }

  confirmPopup(product: CreateItem): Observable<any> {
    if (this.popupMode === "edit" && this.selectedProduct.id) {
      return this.facade.editProduct(product, this.selectedProduct.id)
    } else {
      return this.facade.addProduct(product)
    }
  }
  resetProductCache(): void {
    const keysToClear = Object.keys(localStorage).filter((key) => key.startsWith("products_"))
    keysToClear.forEach((key) => localStorage.removeItem(key))
  }

  private emptyProduct(): CreatedItem {
    return {
      id: 0,
      name: "",
      image: "",
      isAuction: true,
      startingPrice: 0,
      buyNowPrice: null,
      quantity: 1,
      auctionEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dni od teraz
      description: "",
      createdAt: new Date(),
      category: "",
      available: true,
      tags: [],
      location: "",
      ownerId: 0,
      rating: 0,
      views: 0,
    }
  }
}
