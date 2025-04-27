import { Injectable } from "@angular/core"
import { ProductsService } from "./products.service"
import { CreatedItemDto, DeleteItemResponse, GetAllItemsResponse } from "@my-monorepo/consts"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ClothesFacadeService {
  constructor(private productsService: ProductsService) {}

  fetchProducts(skip: number, limit: number): Observable<GetAllItemsResponse> {
    return this.productsService.getProducts({ skip, limit })
  }

  getProductById(id: number): Observable<CreatedItemDto> {
    return this.productsService.getProductById(id)
  }

  addProduct(product: CreatedItemDto): Observable<CreatedItemDto> {
    return this.productsService.addProduct(product)
  }

  editProduct(product: CreatedItemDto, id: number): Observable<CreatedItemDto> {
    return this.productsService.editProduct(product, id)
  }

  deleteProduct(id: number): Observable<DeleteItemResponse> {
    return this.productsService.deleteProduct(id)
  }
}
