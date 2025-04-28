import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "../../decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    // console.log("User:", user) // Debugging line
    // console.log("Required Roles:", requiredRoles) // Debugging line
    if (!user.roles.some((role) => requiredRoles.includes(role))) {
      console.log("User role not allowed")
      return false
    }

    return true
  }
}
