import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('factor') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  @Input('direction') set parallaxDirection(val: string) {
    this.direction = val;
  }
  
  @Input('distance') set parallaxDistance(val: number) {
    this.distance = val;
  }

  private factor: number | undefined;
  private direction: string | undefined;
  private distance: number | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

    @HostListener('window:scroll')
    onWindowScroll() {
        this.renderer.setProperty(
          this.elementRef.nativeElement, 
          'style',
          `transform: translateX(${ 
            this.direction === 'right' ?
            this.distance! - this.getTranslation() > 0 && this.distance! - this.getTranslation() :
            this.distance! + this.getTranslation() < 0 && this.distance! + this.getTranslation()}px)`
          );
    }

    private getTranslation() {
      return window.scrollY * this.factor! / 10;
    }

}
