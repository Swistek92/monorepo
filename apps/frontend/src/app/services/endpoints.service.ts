import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class EndpointsService {
  private readonly BASE_URL = "http://localhost:3000"

  // 🔐 AUTH

  register(): string {
    return `${this.BASE_URL}/auth/register`
  }

  refresh(): string {
    return `${this.BASE_URL}/auth/refresh`
  }

  me(): string {
    return `${this.BASE_URL}/auth/me`
  }

  logout(): string {
    return `${this.BASE_URL}/auth/logout`
  }

  // 👤 ADMIN
  getAllUsers(): string {
    return `${this.BASE_URL}/auth/users`
  }

  updateUser(id: number): string {
    return `${this.BASE_URL}/auth/users/${id}`
  }

  deleteUser(id: number): string {
    return `${this.BASE_URL}/auth/users/${id}`
  }

  // 🧾 BIDS
  getBids(): string {
    return `${this.BASE_URL}/bids`
  }

  getBidById(id: number): string {
    return `${this.BASE_URL}/bids/${id}`
  }
  createBid(): string {
    return `${this.BASE_URL}/bids`
  }

  deleteBid(id: number): string {
    return `${this.BASE_URL}/bids/${id}`
  }
}
