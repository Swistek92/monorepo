import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CreatedItemDto, CreateItemDto } from "@my-monorepo/consts"
import { RatingModule } from "primeng/rating"
import { FormsModule } from "@angular/forms"
import { ButtonModule } from "primeng/button"
import { ConfirmationService } from "primeng/api"
import { ConfirmPopupModule } from "primeng/confirmpopup"
import { PricePipe } from "../../pipes/price.pipe"
import { TruncateNamePipe } from "../../pipes/truncate-name.pipe"
import { Router, RouterModule } from "@angular/router"
import { LoadingComponent } from "../spinner/spinner.component"
import { IsOwnerDirective } from "../../services/auth/directives/is-owner.directive"

@Component({
  selector: "app-product",
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
    RouterModule,
    IsOwnerDirective,
  ],
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  providers: [ConfirmationService],
})
export class ProductComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService, private router: Router) {}

  @ViewChild("deleteButton") deleteButton: any
  @Input() product!: CreatedItemDto

  @Output() edit: EventEmitter<CreatedItemDto> = new EventEmitter<CreatedItemDto>()
  @Output() delete: EventEmitter<CreatedItemDto> = new EventEmitter<CreatedItemDto>()

  goToDetails(): void {
    this.router.navigate(["/product", this.product.id])
  }

  editProduct() {
    this.edit.emit(this.product)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: "Are you sure you want to delete this product?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.delete.emit(this.product)
      },
    })
  }

  ngOnInit(): void {}
}
