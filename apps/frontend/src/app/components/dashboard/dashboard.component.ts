import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AuthFacadeService } from "../../services/user-auth/auth-facade.service"
import { TableModule } from "primeng/table"
import { ButtonModule } from "primeng/button"
import { SafeUser } from "apps/frontend/types/types"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  users: SafeUser[] = []
  loading = false

  constructor(private authFacade: AuthFacadeService) {}

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(): void {
    this.loading = true
    this.authFacade.getAllUsers().subscribe({
      next: (users) => {
        console.log("Fetched users:", users)
        this.users = users
        this.loading = false
      },
      error: (err) => {
        console.error("Failed to load users", err)
        this.loading = false
      },
    })
  }

  toggleActivation(user: SafeUser): void {
    const updated = { ...user, isActive: !user.isActive }

    this.authFacade.updateUser(user.id, updated).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((u) => u.id === user.id)
        this.users[index] = updatedUser
      },
      error: (err) => {
        console.error("Update failed", err)
      },
    })
  }

  deleteUser(user: SafeUser): void {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return

    this.authFacade.deleteUser(user.id).subscribe({
      next: () => {
        this.fetchUsers() // Refresh the list after deletion
        // this.users = this.users.filter(u => u.id !== user.id);
      },
      error: (err) => {
        console.error("Delete failed", err)
      },
    })
  }
}
