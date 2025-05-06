import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
// import { SafeUser } from "@my-monorepo/consts"
import { SafeUser } from "apps/frontend/types/types"
import { Role } from "@my-monorepo/consts"

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private userSubject = new BehaviorSubject<SafeUser | null>(null)
  public user$: Observable<SafeUser | null> = this.userSubject.asObservable()

  constructor() {}

  logout(): void {
    this.clearUser()
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  // 📦 Set user after login/me()
  setUser(user: SafeUser): void {
    this.userSubject.next(user)
  }

  // ❌ Clear on logout
  clearUser(): void {
    this.userSubject.next(null)
  }

  // ✅ Synchronous getters (np. do guardów)
  getUser(): SafeUser | null {
    return this.userSubject.getValue()
  }

  userIsActive(): boolean {
    return this.getUser()?.isActive ?? false
  }

  isLoggedIn(): boolean {
    return !!this.getUser()
  }

  hasRole(role: Role): boolean {
    return this.getUser()?.roles.includes(role) ?? false
  }

  hasId(id: number): boolean {
    return this.getUser()?.id === id
  }
}
