import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { DragAndDropEvent, ListItem } from "./draggable-list.interface";
import { DraggableItemTemplateDirective } from "./draggable-item-template.directive";
import Sortable from 'sortablejs';

const ANIMATION_TIMER = 200;

@Component({
  selector: 'app-draggable-list',
  templateUrl: './draggable-list.component.html',
  styleUrl: './draggable-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableListComponent implements AfterViewInit, OnDestroy {

  @Input() items: ListItem[] = [];
  isActive = true;

  @Input() set disabled(disabled: boolean) {
    this.isActive = !disabled;
    if (this.isRendered) {
      if (this.isActive) {
        this.sortable = this.initializeSortable()
      } else if (this.sortable) {
        this.sortable.destroy();
        this.sortable = null;
      }
    }
  }

  @Output() itemDropped: EventEmitter<DragAndDropEvent> = new EventEmitter();
  @Output() dragStart: EventEmitter<void> = new EventEmitter();
  @Output() dragEnd: EventEmitter<void> = new EventEmitter();
  draggableList = inject(ElementRef);
  @ContentChild(DraggableItemTemplateDirective, { read: TemplateRef, static: true }) itemTemplateRef!: TemplateRef<any>;
  private xRect?: number;
  private yRect?: number;
  private sortable?: Sortable | null;
  private isRendered = false;

  ngAfterViewInit(): void {
    this.isRendered = true;
    if (this.isActive) {
      this.sortable = this.initializeSortable()
    }
  }

  ngOnDestroy(): void {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
  }

  onDrop(startIndex: number, endIndex: number): void {
    this.itemDropped.emit({
      startIndex,
      endIndex,
    });
  }

  onDragStart(): void {
    this.dragStart.emit();
  }

  onDragEnd(): void {
    this.dragEnd.emit();
  }


  private initializeSortable(): Sortable {
    return Sortable.create(this.draggableList.nativeElement, {
      animation: 100,
      ghostClass: 'draggable-ghost',
      dragClass: 'dragging-item',
      forceFallback: true,
      onEnd: event => {
        const list = [...Array.from(event.target.children)];
        const startIndex = event.oldIndex || 0;
        const endIndex = event.newIndex || 0;
        const startedElement = (list[startIndex] as HTMLElement);
        const endedElement = (list[endIndex] as HTMLElement);
        this.onDrop(startIndex, endIndex);
        this.placeholderGhostAnimationHandler(startedElement, endedElement);
        this.onDragEnd();
      },
      onStart: () => {
        const fallback = document.querySelector('.sortable-fallback');
        const list = fallback?.parentElement;
        if (list) {
          const mutationObserver = new MutationObserver(this.placeholderDropAnimationHandler(list));
          mutationObserver.observe(list, { childList: true });
          this.onDragStart();
        }
      },
    });
  }

  private placeholderGhostAnimationHandler(startedElement: HTMLElement, endedElement: HTMLElement): void {
    const placeholderClass = 'draggable-ghost';
    const fromRect = startedElement.getBoundingClientRect();
    const toRect = endedElement.getBoundingClientRect();
    this.xRect = toRect.x - fromRect.x;
    this.yRect = toRect.y - fromRect.y;
    endedElement.classList.add(placeholderClass);
    setTimeout(
      () => endedElement.classList.remove(placeholderClass),
      ANIMATION_TIMER,
    );
  }

  private placeholderDropAnimationHandler(list?: HTMLElement): (mutationsList: MutationRecord[], observer: MutationObserver) => void {
    return (mutationsList: MutationRecord[], observer: MutationObserver): void => {
      mutationsList.forEach(record => {
        const removed = [...Array.from(record.removedNodes)] as HTMLElement[];
        const placeholder = removed.find(node => node.classList.contains('sortable-fallback'));
        if (placeholder && list) {
          const cloned = placeholder.cloneNode(true) as HTMLElement;
          list.append(cloned);
          cloned.style.transition = `cubic-bezier(1, 0.5, 0.2, 1) ${ANIMATION_TIMER}ms`;
          cloned.offsetHeight;
          cloned.style.transform = `matrix(1, 0, 0, 1, ${this.xRect}, ${this.yRect})`;
          setTimeout(() => cloned.remove(), ANIMATION_TIMER);
          observer.disconnect();
        }
      });
    };
  }

}
