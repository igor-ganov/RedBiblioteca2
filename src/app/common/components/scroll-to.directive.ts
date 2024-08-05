import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {scrollOffset} from '@app/Configuration';

@Directive({selector: '[scrollTo]'})
export class ScrollToDirective implements AfterViewInit {
  @Input({alias: 'scrollTo', required: true}) public id!: string;

  constructor(private elRef: ElementRef, private readonly activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id) {
      setTimeout(() => {
        const y = this.elRef.nativeElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      });
    }
  }
}
