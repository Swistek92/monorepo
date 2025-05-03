import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { AuthService } from "./auth.service"
import {
  RefreshResponse,
  RegisterPayload,
  Role,
  UpdateUserPayload,
  UserRole,
} from "@my-monorepo/consts"
import { AuthResponse, LoginPayload, SafeUser } from "apps/frontend/types/types"

@Injectable({
  providedIn: "root",
})
export class AuthFacadeService {
  constructor(private authService: AuthService) {}

  // 🔐 Login
  login(payload: LoginPayload): Observable<AuthResponse> {
    console.log
    return this.authService.login(payload)
  }

  // 🆕 Register
  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.authService.register(payload)
  }

  // 👤 Me
  getCurrentUser(): Observable<SafeUser> {
    return this.authService.me()
  }

  // 🔄 Refresh token
  refreshToken(): Observable<RefreshResponse> {
    return this.authService.refreshToken()
  }

  // 🔁 Autologin
  autoLogin(): void {
    this.authService.autoLogin()
  }

  // ✅ Set user in store
  setUser(user: SafeUser): void {
    this.authService.setUser(user)
  }

  getUser(): SafeUser | null {
    return this.authService.getUser()
  }

  // 📦 Token helpers
  setTokens(access: string, refresh: string): void {
    this.authService.setTokens(access, refresh)
  }

  getAccessToken(): string | null {
    return this.authService.getAccessToken()
  }

  getRefreshToken(): string | null {
    return this.authService.getRefreshToken()
  }

  clearSession(): void {
    this.authService.clearSession()
  }

  // 🚪 Logout
  logout(): void {
    this.authService.logout()
  }

  // 🔍 Login status
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  // 🔍 Verify token
  checkTokenValidity(token: string): Promise<void> {
    return this.authService.checkTokenValidity(token)
  }

  // 📋 ADMIN — get all users
  getAllUsers(): Observable<SafeUser[]> {
    const users = this.authService.getAllUsers()
    return users
  }

  // 🛠️ ADMIN — update user
  updateUser(id: number, data: UpdateUserPayload): Observable<SafeUser> {
    return this.authService.updateUser(id, data)
  }

  // ❌ ADMIN — delete user
  deleteUser(id: number): Observable<{ message: string }> {
    return this.authService.deleteUser(id)
  }

  // ✅ User role & status helpers

  isAdmin(): boolean {
    return this.authService.getUser()?.roles.includes(Role.ADMIN) ?? false
  }

  isUser(): boolean {
    return this.authService.getUser()?.roles.includes(Role.USER) ?? false
  }

  isActive(): boolean {
    return !!this.authService.getUser()?.isActive
  }

  hasRole(role: Role): boolean {
    return this.authService.getUser()?.roles.includes(role) ?? false
  }

  isOwner(id: number): boolean {
    return this.authService.getUser()?.id === id
  }
}
