import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardStoreService } from "../../service/card-store.service";
import { CreditCard } from "../../models/credit-card";
import { CardViewComponent } from "../card-view/card-view/card-view.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import Splide from "@splidejs/splide";
import { NgxColorsModule } from "ngx-colors";

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss'],
  imports: [NgxMaskDirective, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatSelectModule, ReactiveFormsModule, CardViewComponent, JsonPipe, NgIf, NgForOf, NgxColorsModule],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AddNewCardComponent implements AfterViewInit, OnInit {
  needScroll = signal(false);
  cardStore = inject(CardStoreService);

  router = inject(Router);

  @ViewChild("labelInput", { read: ElementRef }) labelInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild("scrollBar", { read: ElementRef }) scrollBarRef!: ElementRef<HTMLDivElement>;

  labelControl = new FormControl('', Validators.required)
  currencyControl = new FormControl('BYN')
  cardNumberControl = new FormControl('', Validators.required)
  pinControl = new FormControl('', [Validators.required, Validators.minLength(4)])
  cardHolderControl = new FormControl('', Validators.required)
  expiryDateControl = new FormControl('', Validators.required)
  CVVControl = new FormControl('',)
  colorFormControl = new FormControl('#29b6f6',)

  form = new FormGroup({
      label: this.labelControl,
      currency: this.currencyControl,
      cardNumber: this.cardNumberControl,
      pin: this.pinControl,
      cardHolder: this.cardHolderControl,
      expiryDate: this.expiryDateControl,
      CVV: this.CVVControl,
      color: this.colorFormControl,
    }
  )

  currentCard = toSignal(this.form.valueChanges);
  ngOnInit(): void {
    this.form.patchValue(this.form.value);
  }

  ngAfterViewInit(): void {
    new Splide( '.splide', {
      type: 'slide',
      gap: '1em',

    } ).mount();
    Promise.resolve().then(() => {
      this.needScroll.set(!this.scrolledToBottom)
    })
    this.scrollBarRef.nativeElement.onscroll = () => {
      this.needScroll.set(!this.scrolledToBottom)
    }
  }

  get scrolledToBottom(): boolean {
    const scrollBar = this.scrollBarRef.nativeElement;
    return (scrollBar.offsetHeight + scrollBar.scrollTop) >= scrollBar.scrollHeight;
  }

  addNewCard() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
      this.cardStore.addNewCard(this.form.value as CreditCard);
      this.router.navigateByUrl('');
    }
  }

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


}
