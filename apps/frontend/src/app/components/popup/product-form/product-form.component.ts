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
import { PopupControllerService } from "../../../services/popup/popup-controller.service"
import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { PopupWrapperComponent } from "../popup-wrapper/popup-wrapper.component"
import { CreateItem, PopupMode } from "../../../../../types/types"
import { InputNumberModule } from "primeng/inputnumber"
import { CalendarModule } from "primeng/calendar"
import { RadioButtonModule } from "primeng/radiobutton"
import { ClothesFacadeService } from "../../../services/products/products-facade.service"

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
  styleUrls: ["./product-form.component.scss"], // 👈 to jest wymagane!
})
export class ProductFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder)
  private popupController = inject(PopupControllerService<CreateItem>)
  private productFacade = inject(ClothesFacadeService)
  @Input() product: CreateItem | null = null
  @Input() mode: PopupMode = "add"

  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()

  @Output() submit = new EventEmitter<CreateItem>()
  @Output() cancel = new EventEmitter<void>()

  form!: FormGroup
  submitted = false

  ngOnInit(): void {
    this.popupController.mode$.subscribe((mode) => {
      this.mode = mode
    })

    this.popupController.data$.subscribe((product) => {
      this.buildForm(product)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["product"] || changes["mode"]) {
      this.buildForm(this.mode === "edit" ? this.product : null)
    }
  }

  buildForm(product: CreateItem | null): void {
    this.form = this.fb.group(
      {
        name: [product?.name || "", [Validators.required]],
        image: [product?.image || ""],
        isAuction: [product?.isAuction ?? true, [Validators.required]],
        startingPrice: [product?.startingPrice ?? 0, [Validators.required, Validators.min(0)]],
        buyNowPrice: [product?.buyNowPrice ?? null],
        quantity: [product?.quantity ?? 1, [Validators.required, Validators.min(1)]],
        // auctionEndDate: [product?.auctionEndDate ?? null, [Validators.required]],
        description: [product?.description || "", [Validators.required]],
        category: [product?.category || "", [Validators.required]],
        location: [product?.location || "", [Validators.required]],
        tags: [product?.tags || [], [Validators.required]],
      },
      {
        validators: (formGroup) => {
          const isAuction = formGroup.get("isAuction")?.value
          const quantity = formGroup.get("quantity")?.value
          return isAuction && quantity > 1 ? { quantityInvalid: true } : null
        },
      },
    )

    // Obsługa dynamicznego przełączania trybu aukcji
    // this.form.get("isAuction")?.valueChanges.subscribe((isAuction) => {
    //   this.updateAuctionRelatedFields(isAuction)
    // })

    // Wymuszamy stan początkowy po inicjalizacji
    // const isAuctionInitial = this.form.get("isAuction")?.value
    // this.updateAuctionRelatedFields(isAuctionInitial)

    this.submitted = false
  }

  // private updateAuctionRelatedFields(isAuction: boolean): void {
  //   const quantityEl = document.getElementById("quantityField")
  //   const buyNowPriceEl = document.getElementById("buyNowPriceField")
  //   const startingPriceEl = document.getElementById("startingPriceField")
  //   console.log(quantityEl, buyNowPriceEl, startingPriceEl)
  //   if (isAuction) {
  //     if (quantityEl) quantityEl.style.display = "none"
  //     if (buyNowPriceEl) buyNowPriceEl.style.display = "none"
  //     if (startingPriceEl) startingPriceEl.style.display = "none"

  //     this.form.get("quantity")?.setValue(1, { emitEvent: false })
  //   } else {
  //     if (quantityEl) quantityEl.style.display = "block"
  //     if (buyNowPriceEl) buyNowPriceEl.style.display = "block"
  //     if (startingPriceEl) startingPriceEl.style.display = "block"
  //   }
  // }

  get isAuction(): boolean {
    return this.form?.get("isAuction")?.value
  }

  onTagsInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    this.form.controls["tags"].setValue(tags)
  }

  async onSubmit() {
    this.submitted = true

    if (this.form.valid) {
      const formValue = this.form.value

      const cleanedProduct: CreateItem = {
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

      this.submit.emit(cleanedProduct)
    } else {
      this.form.markAllAsTouched()
    }
  }

  onCancel(): void {
    this.hide()
    this.cancel.emit()
  }

  hide(): void {
    this.visible = false
    this.visibleChange.emit(this.visible)
  }

  get f() {
    return this.form.controls
  }
}
