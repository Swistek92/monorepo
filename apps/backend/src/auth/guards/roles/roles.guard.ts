import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "../../decorators/roles.decorator"
import { Role } from "@my-monorepo/consts"
import { SafeUserDto } from "../../dto"

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

    const safeuser = user.user as SafeUserDto
    if (!safeuser.roles.some((role) => requiredRoles.includes(role))) {
      console.log("User role not allowed")
      return false
    }

    return true
  }
}
