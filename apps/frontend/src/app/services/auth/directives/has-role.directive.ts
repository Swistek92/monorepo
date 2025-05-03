import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit } from "@angular/core"
import { AuthStoreService } from "../../user-auth/auth-store.service"
import { Role } from "@my-monorepo/consts"
@Directive({
  selector: "[appHasRole]",
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef<any>)
  private viewContainer = inject(ViewContainerRef)
  private authStore = inject(AuthStoreService)

  @Input("appHasRole") role: Role[]

  ngOnInit(): void {
    const user = this.authStore.getUser()

    if (user?.roles?.some((r) => this.role.includes(r as Role))) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }
}
