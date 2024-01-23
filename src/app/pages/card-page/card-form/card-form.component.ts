import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CardViewComponent } from "../../../components/card-view/card-view.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NgxColorsModule } from "ngx-colors";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CreditCard } from "@models/credit-card";
import { ToFormGroup } from "@utils/to-form-group";
import Splide from "@splidejs/splide";
import { distinctUntilChanged, startWith } from "rxjs";
import { isEqual } from "@utils/isEqual";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export type CreditCardFormModel = ToFormGroup<Omit<CreditCard, 'id'>>

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CardViewComponent,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxColorsModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input({ required: true })
  form!: FormGroup<CreditCardFormModel>
  currentCard = signal<CreditCard | null>(null)
  splide!: Splide;
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        distinctUntilChanged(isEqual),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.currentCard.set(value as CreditCard))
  }

  ngOnDestroy(): void {
    this.splide.destroy(true);
  }

  ngAfterViewInit(): void {
    const startIndex = this.form.controls.previewType.value || 0;
    this.splide = new Splide('.splide', {
      type: 'slide',
      gap: '1em',
      start: startIndex
    });
    this.splide.mount();
    this.splide.on('moved', (index) => {
      this.form.controls.previewType.markAsDirty();
      this.form.controls.previewType.setValue(index);
    })
  }

}
