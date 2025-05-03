import { CommonModule } from "@angular/common"
import { Component, inject } from "@angular/core"
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
import { ButtonModule } from "primeng/button"
import { DialogModule } from "primeng/dialog"
import { InputTextModule } from "primeng/inputtext"
import { PopupWrapperComponent } from "../popup-wrapper/popup-wrapper.component"
import { AuthFacadeService } from "../../../services/user-auth/auth-facade.service"

@Component({
  selector: "app-form-register",
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PopupWrapperComponent,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  visible = false
  submitted = false

  form!: FormGroup

  private fb = inject(FormBuilder)
  private authFacade = inject(AuthFacadeService)

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  show(): void {
    this.visible = true
  }

  hide(): void {
    this.visible = false
    this.submitted = false
    this.form.reset()
  }

  register(): void {
    this.submitted = true

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.authFacade.register(this.form.value).subscribe({
      next: (res) => {
        // this.authFacade.setTokens(res.accessToken, res.refreshToken)
        // this.authFacade.setUser(res.user)
        // this.visible = false
      },
      error: () => {
        alert("Błąd rejestracji. Spróbuj ponownie.")
      },
    })
  }

  get f() {
    return this.form.controls
  }
}
