import { Component, ViewChild, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductComponent } from "../components/product/product.component"
import { ProductFormComponent } from "../components/popup/product-form/product-form.component"
import { Paginator, PaginatorModule } from "primeng/paginator"
import { PopupWrapperComponent } from "../components/popup/popup-wrapper/popup-wrapper.component"
import { ButtonModule } from "primeng/button"
import { DialogModule } from "primeng/dialog"
import { ClothesFacadeService } from "../services/products/products-facade.service"
import { HomeService } from "../services/home-service"
import { CreatedItem, CreateItem } from "../../../types/types"
import { UserService } from "../../../../backend/src/user/user.service"
import { AuthStoreService } from "../services/user-auth/auth-store.service"
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    ProductFormComponent,
    PaginatorModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: CreatedItem[] = []
  totalRecords = 0
  rows = 5

  @ViewChild("paginator") paginator?: Paginator

  constructor(
    private clothesFacade: ClothesFacadeService,
    public homeCtrl: HomeService,
    private auth: AuthStoreService,
  ) {}

  isActive() {
    return this.auth.userIsActive()
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows)
  }

  onPageChange(event: any) {
    const skip = event.page * event.rows
    const limit = event.rows
    this.fetchProducts(skip, limit)
  }
  fetchProducts(skip: number, limit: number) {
    this.clothesFacade.fetchProducts(skip, limit).subscribe((res) => {
      this.products = res.items
      this.totalRecords = res.total
    })
  }

  onPopupConfirm(product: CreateItem) {
    this.homeCtrl.confirmPopup(product, () => {
      this.fetchProducts(0, this.rows)
      this.resetPaginator()
    })
  }

  resetPaginator() {
    this.paginator?.changePage(0)
  }

  deleteProduct(id: number) {
    this.clothesFacade.deleteProduct(id).subscribe(() => {
      this.fetchProducts(0, this.rows)
      this.resetPaginator()
    })
  }
}
