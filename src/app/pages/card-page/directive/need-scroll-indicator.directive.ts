import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, inject, signal } from '@angular/core';

@Directive({
  selector: '[appNeedScrollIndicator]',
  standalone: true,
})
export class NeedScrollIndicatorDirective implements AfterViewInit {
  @HostBinding('class.need-scroll')
  needScroll = false;

  elementRef = inject(ElementRef);
  changeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.needScroll = !this.scrolledToBottom;
    })
    this.elementRef.nativeElement.onscroll = () => {
      const prev = this.needScroll;
      this.needScroll = !this.scrolledToBottom;
      if (this.needScroll !== prev) {
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  get scrolledToBottom(): boolean {
    const scrollBar = this.elementRef.nativeElement;
    return (scrollBar.offsetHeight + scrollBar.scrollTop) >= scrollBar.scrollHeight;
  }

}
