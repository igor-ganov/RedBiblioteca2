import {Directive, HostListener, output} from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[clickOrEnter]'
})
export class ClickOrEnterDirective {
  public readonly clickOrEnter = output<Event>();

  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    this.clickOrEnter.emit(event);
  }

  @HostListener('keydown.enter', ['$event'])
  public handleEnter(event: KeyboardEvent): void {
    this.clickOrEnter.emit(event);
  }
}
