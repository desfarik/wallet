import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appNeedScrollIndicator]',
  standalone: true,
})
export class NeedScrollIndicatorDirective implements AfterViewInit {

  @HostBinding('class.need-scroll')
  needScroll = false;

  elementRef = inject(ElementRef);
  changeDetectorRef = inject(ChangeDetectorRef);

  @HostListener('scroll') onScroll() {
    const prev = this.needScroll;
    this.needScroll = !this.scrolledToBottom;
    if (this.needScroll !== prev) {
      this.changeDetectorRef.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.onScroll());
  }

  get scrolledToBottom(): boolean {
    const scrollBar = this.elementRef.nativeElement;
    return (scrollBar.offsetHeight + scrollBar.scrollTop) >= scrollBar.scrollHeight;
  }

}
