import { Injectable } from "@angular/core"
import { Observable, of, tap } from "rxjs"
import { ApiService } from "../api.service"

import { ItemFilter, ItemsEndpoints } from "@my-monorepo/consts"
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

  getProducts(params: Pagination, filters?: ItemFilter): Observable<GetAllItemsResponse> {
    const skip = Number(params.skip) || 0
    const limit = Number(params.limit) || 10

    // 🔐 Unikalny klucz cache uwzględniający filtry
    const filterKey = filters ? JSON.stringify(filters) : ""
    const cacheKey = `products_${skip}_${limit}_${btoa(filterKey)}`

    const cache = localStorage.getItem(cacheKey)
    if (cache) {
      const cachedData = JSON.parse(cache)
      const cachedTime = new Date(cachedData.timestamp)
      const now = new Date()
      const diffInMinutes = (now.getTime() - cachedTime.getTime()) / (1000 * 60)

      if (diffInMinutes < 15) {
        return of(cachedData.data)
      }
    }

    // 🔧 Budujemy query string
    const query: Record<string, any> = {
      skip,
      limit,
    }

    if (filters) {
      if (filters.name) query["name"] = filters.name
      if (filters.category) query["category"] = filters.category
      if (filters.isAuction !== undefined) query["isAuction"] = filters.isAuction
      if (filters.available !== undefined) query["available"] = filters.available
      if (filters.location) query["location"] = filters.location
      if (filters.priceMin !== undefined) query["priceMin"] = filters.priceMin
      if (filters.priceMax !== undefined) query["priceMax"] = filters.priceMax
      if (filters.ownerFilter) query["ownerFilter"] = filters.ownerFilter
      if (filters.ownerId !== undefined) query["ownerId"] = filters.ownerId
    }

    return this.apiService
      .get<GetAllItemsResponse>(ItemsEndpoints.getAll(), {
        responseType: "json",
        params: query,
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
