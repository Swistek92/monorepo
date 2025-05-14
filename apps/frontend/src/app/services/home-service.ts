import { Injectable } from "@angular/core"
import { ClothesFacadeService } from "./products/products-facade.service"
import { CreatedItem, CreateItem, PopupMode } from "../../../types/types"
import { Observable } from "rxjs"
import { promise } from "zod"
import { CategoryEnum } from "@my-monorepo/consts"
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

  async confirmAddPopup(product: CreateItem) {
    console.log("confirmAddPopup", product)
    const add = await this.facade.addProduct(product)
    console.log("answer", add)
    this.facade.clearProductFromCache(add.id)
    return add
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
      category: CategoryEnum.OTHERS,
      available: true,
      tags: [],
      location: "",
      ownerId: 0,
      rating: 0,
      views: 0,
    }
  }
}
