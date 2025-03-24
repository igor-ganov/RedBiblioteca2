import {AfterViewInit, Directive, ElementRef, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {scrollOffset} from '@app/Configuration';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({selector: '[scrollTo]'})
export class ScrollToDirective implements AfterViewInit {
  public readonly id = input.required<string>({alias: "scrollTo"});

  public constructor(private elRef: ElementRef, private readonly activatedRoute: ActivatedRoute) {
  }

  public ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id()) {
      setTimeout(() => {
        const y = this.elRef.nativeElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      });
    }
  }
}
