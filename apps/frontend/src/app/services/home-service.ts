import { Injectable } from "@angular/core"
import { CreatedItemDto, PopupMode } from "@my-monorepo/consts"
import { ClothesFacadeService } from "./products/products-facade.service"

@Injectable({ providedIn: "root" })
export class HomeService {
  selectedProduct: CreatedItemDto = this.emptyProduct()
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

  openEdit(product: CreatedItemDto) {
    this.selectedProduct = product
    this.popupMode = "edit"
  }

  cancelPopup() {
    this.popupMode = null
  }

  confirmPopup(product: CreatedItemDto, refreshFn: () => void) {
    if (this.popupMode === "edit" && this.selectedProduct.id) {
      this.facade.editProduct(product, this.selectedProduct.id).subscribe(refreshFn)
    } else {
      this.facade.addProduct(product).subscribe(refreshFn)
    }
    this.popupMode = null
  }

  private emptyProduct(): CreatedItemDto {
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
