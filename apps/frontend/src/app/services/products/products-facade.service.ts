import { Injectable } from "@angular/core"
import { ProductsService } from "./products.service"
import {
  CreatedItem,
  CreateItem,
  DeleteItemResponse,
  GetAllItemsResponse,
} from "../../../../types/types"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ClothesFacadeService {
  constructor(private productsService: ProductsService) {}

  fetchProducts(skip: number, limit: number): Observable<GetAllItemsResponse> {
    return this.productsService.getProducts({ skip, limit })
  }

  getProductById(id: number): Observable<CreatedItem> {
    return this.productsService.getProductById(id)
  }

  addProduct(product: CreateItem): Observable<CreatedItem> {
    return this.productsService.addProduct(product)
  }

  editProduct(product: CreateItem, id: number): Observable<CreatedItem> {
    return this.productsService.editProduct(product, id)
  }

  deleteProduct(id: number): Observable<DeleteItemResponse> {
    return this.productsService.deleteProduct(id)
  }
}
