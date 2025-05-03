import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthFacadeService } from "../../user-auth/auth-facade.service"

export const adminGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacadeService)
  const router = inject(Router)

  if (authFacade.isAdmin()) {
    return true
  }

  router.navigate(["/"])
  return false
}
