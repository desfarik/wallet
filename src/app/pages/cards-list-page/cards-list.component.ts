import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardStoreService } from "../../service/card-store.service";
import { CardViewComponent } from "../../components/card-view/card-view.component";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { DragAndDropEvent, DraggableListModule } from "../../components/draggable-list";
import { NgxLongPress2Module } from "ngx-long-press2";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardViewComponent,
    RouterLink,
    RouterLinkActive,
    DraggableListModule,
    NgxLongPress2Module,
  ],
  standalone: true
})
export class CardsListComponent {

  cardStore = inject(CardStoreService);
  router = inject(Router);

  isEditMode = signal(false);

  reorderItems({ startIndex, endIndex }: DragAndDropEvent): void {
    this.isEditMode.set(false)
    this.cardStore.reorderItems(startIndex, endIndex)
  }

  onLongPress(): void {
    this.isEditMode.set(true)
  }

  navigate(itemId: string): void {
    if (this.isEditMode()) {
      return;
    }
    this.router.navigateByUrl(`/card/edit/${itemId}`)
  }
}
