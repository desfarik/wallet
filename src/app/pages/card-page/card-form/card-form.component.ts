import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { CardViewComponent } from "../../../components/card-view/card-view.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NgxColorsModule } from "ngx-colors";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CreditCard } from "../../../models/credit-card";
import { ToFormGroup } from "../../../utils/to-form-group";
import Splide from "@splidejs/splide";
import { distinctUntilChanged, startWith } from "rxjs";
import { isEqual } from "lodash";

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
export class CardFormComponent implements AfterViewInit, OnInit {

  @Input({ required: true })
  form!: FormGroup<CreditCardFormModel>
  currentCard = signal<CreditCard | null>(null)

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(startWith(this.form.value),
        distinctUntilChanged(isEqual))
      .subscribe(value => this.currentCard.set(value as CreditCard))
  }

  ngAfterViewInit(): void {
    const startIndex = this.form.controls.previewType.value || 0;
    const splide = new Splide('.splide', {
      type: 'slide',
      gap: '1em',
      start: startIndex
    });
    splide.mount();
    splide.on('moved', (index) => {
      this.form.controls.previewType.markAsDirty();
      this.form.controls.previewType.setValue(index);
    })
  }
}
