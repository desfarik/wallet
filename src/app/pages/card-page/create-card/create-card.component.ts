import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { CardStoreService } from "../../../service/card-store.service";
import { CreditCard } from "../../../models/credit-card";
import { v4 as uuidv4 } from 'uuid';
import { CardFormComponent } from "../card-form/card-form.component";
import { generateForm } from "../form-generator";
import { NeedScrollIndicatorDirective } from "../directive/need-scroll-indicator.directive";

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
  imports: [CardFormComponent, MatIconModule, RouterLink, MatButtonModule, NeedScrollIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CreateCardComponent {
  cardStore = inject(CardStoreService);
  router = inject(Router);
  form = generateForm();

  addNewCard() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.cardStore.addNewCard({
        id: uuidv4(),
        ...this.form.value
      } as CreditCard);
      this.router.navigateByUrl('');
    }
  }

}
