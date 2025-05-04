import { Injectable } from "@angular/core"
import { ClothesFacadeService } from "./products/products-facade.service"
import { CreatedItem, CreateItem, PopupMode } from "../../../types/types"
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

  confirmPopup(product: CreateItem, refreshFn: () => void) {
    if (this.popupMode === "edit" && this.selectedProduct.id) {
      this.facade.editProduct(product, this.selectedProduct.id).subscribe(refreshFn)
    } else {
      this.facade.addProduct(product).subscribe(refreshFn)
    }
    this.popupMode = null
  }

  private emptyProduct(): CreatedItem {
    return {
      id: 0,
      name: "",
      image: "",
      price: 0,
      rating: 0,
      ownerId: 0,
      description: "",
      createdAt: new Date(),
      category: "",
      available: true,
      views: 0,
      tags: [],
      location: "",
    }
  }
}
