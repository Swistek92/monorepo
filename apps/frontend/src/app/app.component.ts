import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { AuthService } from "./services/user-auth/auth.service"
import { AuthStoreService } from "./services/user-auth/auth-store.service"
import { HeaderComponent } from "./layout/header/header.component"
import { FooterComponent } from "./layout/footer/footer.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-learn"

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin()

    this.authService.me().subscribe({
      next: (user) => {
        this.authStore.setUser(user) // ✅ Ustawia usera w store
      },
      error: () => {
        console.warn("Nie udało się pobrać użytkownika.")
        this.authStore.clearUser()
      },
    })
  }
}
