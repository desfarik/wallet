import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CreditCard } from "../../models/credit-card";
import { CardNumberPipe } from "./pipe/card-number.pipe";
import { SvgIconComponent } from "angular-svg-icon";
import { PaymentIconPipe } from "./pipe/payment-icon.pipe";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [
    CardNumberPipe,
    SvgIconComponent,
    PaymentIconPipe,
    NgIf
  ],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardViewComponent {
  @Input() card!: CreditCard;
  @Input() previewType?: number | null;

  @HostBinding('class')
  get cardPreviewType() {
    const type = this.previewType ?? this.card.previewType
    return `type_${(type + 1)}`;
  }
  @HostBinding('style.background-color') get color() {
    return this.card.color
  }
}


