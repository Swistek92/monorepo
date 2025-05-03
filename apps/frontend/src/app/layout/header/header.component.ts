import { Component, inject, ViewChild } from "@angular/core"
import { RouterModule } from "@angular/router"
import { LoginComponent } from "../../components/popup/login/login.component"
import { RegisterComponent } from "../../components/popup/register/register.component"
import { ButtonModule } from "primeng/button"
import { AuthStoreService } from "../../services/user-auth/auth-store.service"
import { AsyncPipe, NgIf } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, ButtonModule, LoginComponent, RegisterComponent, AsyncPipe, NgIf],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private authStore = inject(AuthStoreService)

  @ViewChild(LoginComponent) loginModal!: LoginComponent
  @ViewChild(RegisterComponent) registerModal!: RegisterComponent

  user$ = this.authStore.user$
  isDarkMode = false

  constructor() {
    this.initTheme()
  }

  logout() {
    this.authStore.logout()
  }

  openLogin() {
    this.loginModal.show()
  }

  openRegister() {
    this.registerModal.show()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    this.applyTheme()
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light")
  }

  private initTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      this.isDarkMode = savedTheme === "dark"
    } else {
      this.isDarkMode =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    this.applyTheme()
  }

  private applyTheme() {
    const html = document.documentElement
    if (this.isDarkMode) {
      html.classList.add("my-app-dark")
    } else {
      html.classList.remove("my-app-dark")
    }
  }
}
