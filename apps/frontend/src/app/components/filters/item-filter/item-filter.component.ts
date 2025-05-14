import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CategoryEnum, ItemFilter, OwnerFilter } from "@my-monorepo/consts"

@Component({
  selector: "app-item-filter",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./item-filter.component.html",
  styleUrls: ["./item-filter.component.scss"],
})
export class ItemFilterComponent {
  @Output() filterChange = new EventEmitter<ItemFilter>()
  @Input() user: boolean = false

  name: string = ""
  category: CategoryEnum | undefined
  isAuction: boolean | undefined
  available: boolean | undefined
  location: string = ""
  priceMin: number | undefined
  priceMax: number | undefined
  ownerFilter: OwnerFilter = OwnerFilter.ALL

  CategoryEnum = CategoryEnum
  categoryOptions = Object.values(CategoryEnum).map((val) => ({
    label: val,
    value: val,
  }))

  emitFilter() {
    const filter: ItemFilter = {
      name: this.name,
      category: this.category,
      isAuction: this.isAuction,
      available: this.available,
      location: this.location,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
    }

    if (this.user) {
      filter.ownerFilter = this.ownerFilter
    }

    this.filterChange.emit(filter)
  }

  resetFilters() {
    this.name = ""
    this.category = undefined
    this.isAuction = undefined
    this.available = undefined
    this.location = ""
    this.priceMin = undefined
    this.priceMax = undefined
    this.ownerFilter = OwnerFilter.ALL

    this.emitFilter()
  }
}
