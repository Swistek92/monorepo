import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "../api.service"
import { CreatedItemDto, CreateItemDto, PaginationParams, UpdateItemDto } from "@my-monorepo/consts"
import { GetAllItemsResponse, ItemsEndpoints } from "@my-monorepo/consts"

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts(params: PaginationParams): Observable<GetAllItemsResponse> {
    const skip = Number(params.skip) || 0
    const limit = Number(params.limit) || 10

    return this.apiService.get<GetAllItemsResponse>(ItemsEndpoints.getAll(skip, limit), {
      responseType: "json",
    })
  }

  getProductById(id: number): Observable<CreatedItemDto> {
    return this.apiService.get<CreatedItemDto>(ItemsEndpoints.getById(id), {
      responseType: "json",
    })
  }

  addProduct(product: CreateItemDto): Observable<CreatedItemDto> {
    return this.apiService.post<CreatedItemDto>(ItemsEndpoints.create(), product, {})
  }

  editProduct(product: UpdateItemDto, id: number): Observable<CreatedItemDto> {
    return this.apiService.put<CreatedItemDto>(ItemsEndpoints.update(id), product, {})
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(ItemsEndpoints.delete(id), {})
  }
}
