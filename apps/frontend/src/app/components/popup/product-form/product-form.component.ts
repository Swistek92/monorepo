import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"

import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { InputNumberModule } from "primeng/inputnumber"
import { CalendarModule } from "primeng/calendar"
import { RadioButtonModule } from "primeng/radiobutton"

import { PopupWrapperComponent } from "../popup-wrapper/popup-wrapper.component"
import { CreateItem, PopupMode } from "../../../../../types/types"

import { PopupControllerService } from "../../../services/popup/popup-controller.service"
import { ClothesFacadeService } from "../../../services/products/products-facade.service"
import { HomeService } from "../../../services/home-service"
import { CategoryEnum } from "@my-monorepo/consts"

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    PopupWrapperComponent,
    RadioButtonModule,
  ],
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder)
  private popupController = inject(PopupControllerService<CreateItem>)
  private productFacade = inject(ClothesFacadeService)
  private homeService = inject(HomeService)
  categoryOptions = Object.values(CategoryEnum)

  @Input() product: CreateItem | null = null
  @Input() mode: PopupMode = "add"
  @Input() visible = false

  @Output() visibleChange = new EventEmitter<boolean>()
  // @Output() submit = new EventEmitter<CreateItem>()
  @Output() cancel = new EventEmitter<void>()
  @Output() success = new EventEmitter<void>()
  form!: FormGroup
  submitted = false

  ngOnInit(): void {
    this.popupController.mode$.subscribe((mode) => (this.mode = mode))
    this.popupController.data$.subscribe((product) => this.buildForm(product))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["product"] || changes["mode"]) {
      this.buildForm(this.mode === "edit" ? this.product : null)
    }
  }

  private buildForm(product: CreateItem | null): void {
    this.form = this.fb.group(
      {
        name: [product?.name || "", Validators.required],
        image: [product?.image || ""],
        isAuction: [product?.isAuction ?? true, Validators.required],
        startingPrice: [product?.startingPrice ?? 0, [Validators.required, Validators.min(0)]],
        buyNowPrice: [product?.buyNowPrice ?? null],
        quantity: [product?.quantity ?? 1, [Validators.required, Validators.min(1)]],
        description: [product?.description || "", Validators.required],
        category: [product?.category ?? CategoryEnum.OTHERS, Validators.required],
        location: [product?.location || "", Validators.required],
        tags: [product?.tags || [], Validators.required],
      },
      {
        validators: (form) => {
          const isAuction = form.get("isAuction")?.value
          const quantity = form.get("quantity")?.value
          return isAuction && quantity > 1 ? { quantityInvalid: true } : null
        },
      },
    )

    this.submitted = false
  }

  get isAuction(): boolean {
    return this.form?.get("isAuction")?.value
  }

  onTagsInputChange(event: Event): void {
    const input = event.target as HTMLInputElement
    const tags = input.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    this.form.controls["tags"].setValue(tags)
  }

  async onSubmit(): Promise<void> {
    console.log("Submit triggered") // <--- test

    this.submitted = true

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const cleanedProduct = this.cleanProduct(this.form.value)

    if (this.mode === "edit") {
      console.log("Updating product:", cleanedProduct)
    } else {
      console.log("Adding new product:", cleanedProduct)
      await this.homeService.confirmAddPopup(cleanedProduct)
      this.success.emit()
    }
  }

  private cleanProduct(formValue: any): CreateItem {
    return {
      name: formValue.name?.trim(),
      image: formValue.image?.trim(),
      isAuction: !!formValue.isAuction,
      startingPrice: Number(formValue.startingPrice),
      buyNowPrice:
        formValue.buyNowPrice !== null && formValue.buyNowPrice !== undefined
          ? Number(formValue.buyNowPrice)
          : null,
      quantity: Number(formValue.quantity),
      description: formValue.description?.trim(),
      category: formValue.category?.trim(),
      location: formValue.location?.trim(),
      auctionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      tags: Array.isArray(formValue.tags)
        ? formValue.tags
        : String(formValue.tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
    }
  }

  onCancel(): void {
    this.cancel.emit()
  }

  get f() {
    return this.form.controls
  }
}
