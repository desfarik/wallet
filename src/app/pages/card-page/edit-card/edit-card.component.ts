import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { CardViewComponent } from "../../../components/card-view/card-view.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { CardStoreService } from "../../../service/card-store.service";
import { CreditCard } from "@models/credit-card";
import { NeedScrollIndicatorDirective } from "../directive/need-scroll-indicator.directive";
import { generateForm } from "../form-generator";
import { CardFormComponent } from "../card-form/card-form.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../components/confirm-dialog/confirm-dialog.component";
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [
    CardViewComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CardFormComponent,
    NeedScrollIndicatorDirective
  ],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCardComponent implements OnInit {
  @Input() id!: string;
  cardStore = inject(CardStoreService);
  router = inject(Router);
  dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef)
  form = generateForm();
  formPristine = signal(true);

  ngOnInit(): void {
    const card = this.cardStore.getById(this.id);
    if (card) {
      this.form.patchValue(card);
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formPristine.set(this.form.pristine));
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.cardStore.saveCard({
        id: this.id,
        ...this.form.value
      } as CreditCard);
      this.router.navigateByUrl('');
    }
  }

  delete() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure to delete this Card?',
        description: 'This action cannot be undone.',
        action: 'Delete',
      },
    }).afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.cardStore.deleteById(this.id);
        this.router.navigateByUrl('');
      })
  }
}
