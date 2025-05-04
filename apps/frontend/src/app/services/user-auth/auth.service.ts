import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "../../services/api.service"
import { EndpointsService } from "../endpoints.service"
import { AuthEndpoints, UserEndpoints } from "@my-monorepo/consts"
import { AuthStoreService } from "./auth-store.service"
import { TokenVerifyService } from "./token-verify.service"
import {
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
  SafeUser,
  UpdateUserPayload,
} from "apps/frontend/types/types"

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(
    private api: ApiService,
    private endpoints: EndpointsService,
    private authStore: AuthStoreService,
    private tokenVerify: TokenVerifyService,
  ) {}

  async checkTokenValidity(token: string) {
    const payload = await this.tokenVerify.verifyToken(token)
    console.log(payload ? "✅ Token OK:" : "❌ Token niepoprawny lub wygasł", payload)
  }

  autoLogin(): void {
    const token = this.getAccessToken()
    console.log("🔑 Auto-login token:", token)
    if (!token) return

    this.me().subscribe({
      next: (user) => {
        console.log("🔑 Auto-login user:", user)
        this.setUser(user) // ✅ używamy metody setUser
        console.log("🔓 Zalogowany użytkownik:", user)
      },
      error: () => {
        console.log("❌ Token wygasł lub niepoprawny")
        this.logout()
      },
    })
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    const usr = this.api.post<AuthResponse>(AuthEndpoints.login(), payload, {})
    return usr
  }

  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.api.post<{ message: string }>(this.endpoints.register(), payload, {})
  }

  refreshToken(): Observable<RefreshResponse> {
    const refreshToken = this.getRefreshToken()
    return this.api.post<RefreshResponse>(this.endpoints.refresh(), { refreshToken }, {})
  }

  me(): Observable<SafeUser> {
    return this.api.get<SafeUser>(UserEndpoints.me(), {})
  }

  logout(): void {
    this.api.post(this.endpoints.logout(), {}, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    })
  }

  // ✅ Set user directly into the store
  setUser(user: SafeUser): void {
    this.authStore.setUser(user)
  }

  // ADMIN
  updateUser(id: number, data: UpdateUserPayload): Observable<SafeUser> {
    return this.api.put<SafeUser>(this.endpoints.updateUser(id), data, {})
  }

  deleteUser(id: number): Observable<{ message: string }> {
    console.log("Deleting user with ID:", id)
    return this.api.delete<{ message: string }>(this.endpoints.deleteUser(id), {})
  }

  getAllUsers(): Observable<SafeUser[]> {
    return this.api.get<SafeUser[]>(UserEndpoints.getAll(), {})
  }

  // Helpers
  setTokens(access: string, refresh: string): void {
    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)
  }

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken")
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken")
  }

  clearSession(): void {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    this.authStore.clearUser()
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken()
  }
  getUser(): SafeUser | null {
    return this.authStore.getUser()
  }
}
