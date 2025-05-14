import { Component, ViewChild, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductComponent } from "../components/product/product.component"
import { ProductFormComponent } from "../components/popup/product-form/product-form.component"
import { Paginator, PaginatorModule } from "primeng/paginator"
import { ButtonModule } from "primeng/button"
import { DialogModule } from "primeng/dialog"
import { ClothesFacadeService } from "../services/products/products-facade.service"
import { HomeService } from "../services/home-service"
import { CreatedItem, CreateItem } from "../../../types/types"
import { AuthFacadeService } from "../services/user-auth/auth-facade.service"
import { ItemFilterComponent } from "../components/filters/item-filter/item-filter.component"
import { ItemFilter } from "@my-monorepo/consts"
import { Subject } from "rxjs"
import { debounceTime } from "rxjs/operators"

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
    ItemFilterComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: CreatedItem[] = []
  totalRecords = 0
  rows = 5
  itemFilter: ItemFilter = {}
  private filterSubject = new Subject<ItemFilter>()

  @ViewChild("paginator") paginator?: Paginator

  constructor(
    private clothesFacade: ClothesFacadeService,
    public homeCtrl: HomeService,
    private auth: AuthFacadeService,
  ) {}

  isActive() {
    return this.auth.isLoggedIn()
  }

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(400)).subscribe((filter) => {
      this.itemFilter = filter
      this.fetchProducts(0, this.rows)
      this.resetPaginator()
    })

    this.fetchProducts(0, this.rows)
  }

  onSeccessAdd() {
    this.homeCtrl.cancelPopup()
    this.resetPaginator()
  }
  onPageChange(event: any) {
    const skip = event.page * event.rows
    const limit = event.rows
    this.fetchProducts(skip, limit)
  }

  fetchProducts(skip: number, limit: number) {
    const user = this.auth.getUser()
    if (user) {
      this.itemFilter.ownerId = user.id
    }
    console.log("fetchProducts", this.itemFilter)
    this.clothesFacade.fetchProducts(skip, limit, { ...this.itemFilter }).subscribe((res) => {
      this.products = res.items
      this.totalRecords = res.total
    })
  }

  // async onPopupConfirm(product: CreateItem) {
  //   try {
  //     await this.homeCtrl.confirmAddPopup(product)
  //     this.homeCtrl.resetProductCache()
  //     this.fetchProducts(0, this.rows)
  //     this.resetPaginator()
  //     this.homeCtrl.cancelPopup()
  //   } catch (err) {
  //     console.error("Saving product failed:", err)
  //   }
  // }

  resetPaginator() {
    if (this.paginator?.getPage() !== 0) {
      this.paginator?.changePage(0)
    } else {
      this.fetchProducts(0, this.rows)
    }
  }

  deleteProduct(id: number) {
    this.clothesFacade.deleteProduct(id).subscribe(() => {
      this.clothesFacade.clearProductFromCache(id) // 👈 dodane
      this.fetchProducts(0, this.rows)
      this.resetPaginator()
    })
  }

  onFilterChange(filter: ItemFilter) {
    this.filterSubject.next(filter) // teraz debounce działa
  }
}
