import { AfterViewInit, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[appNeedScroll]',
  standalone: true,
})
export class NeedScrollDirective implements AfterViewInit{
  needScroll = signal(false);
  elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.needScroll.set(!this.scrolledToBottom)
    })
    this.elementRef.nativeElement.onscroll = () => {
      this.needScroll.set(!this.scrolledToBottom)
    }
  }

  get scrolledToBottom(): boolean {
    const scrollBar = this.elementRef.nativeElement;
    return (scrollBar.offsetHeight + scrollBar.scrollTop) >= scrollBar.scrollHeight;
  }

}
