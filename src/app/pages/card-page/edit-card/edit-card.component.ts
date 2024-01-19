import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CardViewComponent } from "../../../components/card-view/card-view.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { CardStoreService } from "../../../service/card-store.service";
import { CreditCard } from "../../../models/credit-card";
import { NeedScrollDirective } from "../directive/need-scroll.directive";
import { generateForm } from "../form-generator";
import { CardFormComponent } from "../card-form/card-form.component";

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [
    CardViewComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CardFormComponent,
    NeedScrollDirective
  ],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCardComponent implements OnInit {
  @Input() id!: string;
  cardStore = inject(CardStoreService);
  router = inject(Router);
  @ViewChild(NeedScrollDirective, { static: true }) cardForm?: NeedScrollDirective;
  form = generateForm();
  formPristine = signal(true);

  ngOnInit(): void {
    const card = this.cardStore.getById(this.id);
    if (card) {
      this.form.patchValue(card);
    }
    this.form.valueChanges.subscribe(() => this.formPristine.set(this.form.pristine));
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.cardStore.saveCard({
        id: this.id,
        ...this.form.value
      }  as CreditCard);
      this.router.navigateByUrl('');
    }
  }
}
