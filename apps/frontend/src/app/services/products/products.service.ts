import { Injectable } from "@angular/core"
import { Observable, of, tap } from "rxjs"
import { ApiService } from "../api.service"

import { ItemsEndpoints } from "@my-monorepo/consts"
import {
  CreatedItem,
  CreateItem,
  DeleteItemResponse,
  GetAllItemsResponse,
  Pagination,
  UpdateItem,
} from "../../../../types/types"

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts(params: Pagination): Observable<GetAllItemsResponse> {
    const skip = Number(params.skip) || 0
    const limit = Number(params.limit) || 10

    const cacheKey = `products_${skip}_${limit}`
    const cache = localStorage.getItem(cacheKey)

    if (cache) {
      const cachedData = JSON.parse(cache)
      const cachedTime = new Date(cachedData.timestamp)
      const now = new Date()
      const diffInMinutes = (now.getTime() - cachedTime.getTime()) / (1000 * 60)

      if (diffInMinutes < 15) {
        return of(cachedData.data) // ⏱ Zwraca dane z cache
      }
    }

    return this.apiService
      .get<GetAllItemsResponse>(ItemsEndpoints.getAll(skip, limit), {
        responseType: "json",
      })
      .pipe(
        tap((response) => {
          const cacheEntry = {
            data: response,
            timestamp: new Date().toISOString(),
          }
          localStorage.setItem(cacheKey, JSON.stringify(cacheEntry))
        }),
      )
  }

  getProductById(id: number): Observable<CreatedItem> {
    return this.apiService.get<CreatedItem>(ItemsEndpoints.getById(id), {
      responseType: "json",
    })
  }

  addProduct(product: CreateItem): Observable<CreatedItem> {
    return this.apiService.post<CreatedItem>(ItemsEndpoints.create(), product, {})
  }

  editProduct(product: UpdateItem, id: number): Observable<CreatedItem> {
    return this.apiService.put<CreatedItem>(ItemsEndpoints.update(id), product, {})
  }

  deleteProduct(id: number): Observable<DeleteItemResponse> {
    return this.apiService.delete<DeleteItemResponse>(ItemsEndpoints.delete(id), {})
  }
}
