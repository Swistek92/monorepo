import { Injectable } from "@angular/core"
import { ProductsService } from "./products.service"
import {
  CreatedItem,
  CreateItem,
  DeleteItemResponse,
  GetAllItemsResponse,
} from "../../../../types/types"
import { firstValueFrom, Observable } from "rxjs"
import { ItemFilter } from "@my-monorepo/consts"

@Injectable({
  providedIn: "root",
})
export class ClothesFacadeService {
  constructor(private productsService: ProductsService) {}

  fetchProducts(skip: number, limit: number, filter: ItemFilter): Observable<GetAllItemsResponse> {
    return this.productsService.getProducts({ skip, limit }, filter)
  }

  getProductById(id: number): Observable<CreatedItem> {
    return this.productsService.getProductById(id)
  }

  async addProduct(product: CreateItem): Promise<CreatedItem> {
    return await firstValueFrom(this.productsService.addProduct(product))
  }

  editProduct(product: CreateItem, id: number): Observable<CreatedItem> {
    return this.productsService.editProduct(product, id)
  }

  deleteProduct(id: number): Observable<DeleteItemResponse> {
    return this.productsService.deleteProduct(id)
  }

  clearProductFromCache(productId: number): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("products_")) {
        try {
          const cachedData = JSON.parse(localStorage.getItem(key)!)
          const items = cachedData?.data?.items
          if (Array.isArray(items) && items.some((item: any) => item.id === productId)) {
            localStorage.removeItem(key)
          }
        } catch (err) {
          // nieczytelny cache – pomijamy
        }
      }
    }
  }
}
