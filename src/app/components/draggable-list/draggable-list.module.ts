import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DraggableListComponent } from "./draggable-list.component";
import { DraggableItemTemplateDirective } from "./draggable-item-template.directive";
import { CardViewComponent } from "../card-view/card-view.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    CardViewComponent,
    RouterLink,
    RouterLinkActive,
  ],
  declarations: [
    DraggableListComponent,
    DraggableItemTemplateDirective,
  ],
  exports: [
    DraggableListComponent,
    DraggableItemTemplateDirective,
  ],
})
export class DraggableListModule {
}
