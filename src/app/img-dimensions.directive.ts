import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img'
})
export class ImgDimensionsDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('load')
  onLoad() {
    const imgEl = this.el.nativeElement;
    const height = imgEl.offsetHeight;
    const width = imgEl.offsetWidth;
    this.renderer.setAttribute(imgEl, 'height', `${height}px`);
    this.renderer.setAttribute(imgEl, 'width', `${width}px`);
  }
}
