import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  output,
  signal
} from '@angular/core';
import {Slide} from './Slides';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {Base64ToStyle} from '@common/help/pipelines/Base64ToImage';

@Component({
  selector: 'app-slide-show',
  template: `
<div class="container">
  <div class="left">
    <div class="left-panel">
      <button mat-icon-button [disabled]="animationApplying()" (click)="onLeftClick()">
        <mat-icon>arrow_back_ios</mat-icon>
      </button>
    </div>
  </div>
  <div class="center">
    @for (slide of slides; track slide.id) {
      <div class="slide" [style.background-image]="slide.image | base64toStyle" [ngClass]="getClass(slide)">
        <span class="title">{{ slide.id }}. {{ slide.title }}</span>
        <span class="description">{{ slide.description }}</span>
      </div>
    }
  </div>
  <div class="right">
    <div class="right-panel">
      <button mat-icon-button [disabled]="animationApplying()" (click)="onRightClick()">
        <mat-icon>arrow_forward_ios</mat-icon>
      </button>
    </div>
  </div>
</div>

`,
  styleUrl: './slide-show.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton, MatIcon, NgClass, Base64ToStyle]
})
export class SlideShowComponent {
  public constructor(private ref: ChangeDetectorRef) {
  }


  // private readonly changeDetector: ChangeDetectorRef = Inject(ChangeDetectorRef);

  private readonly _slides = signal<Slide[]>([]);
  @Input({required: true})
  public get slides(): Slide[] {
    return this._slides();
  }

  public set slides(value: Slide[]) {
    this._slides.set(value);
    this.current = 0;
  }

  private readonly _selected = signal(0);
  @Input()
  public get selected(): number {
    return this._selected();
  }

  public set selected(value: number) {
    if (this.animationApplying()) {
      this.selectedChange.emit(this._selected());
      return;
    }
    const newValue = this.normalize(value);
    // const newValue = this._selected > value ? this.normalize(this._selected + 1) : this.normalize(this._selected - 1);
    if (this.selected === newValue) return;
    this._selected.set(newValue);
    this.moveTo(newValue);
    this.selectedChange.emit(newValue);
  }

  public readonly selectedChange = output<number>();

  public getClass(slide: Slide): [SliderClass, SlidAnimationDirectionClass, SlidAnimationClass] {
    if (this.slides[this.current] === slide) return ['current', this.slideDirection, this.slideAnimation];
    if (this.previous !== undefined && this.slides[this.previous] === slide) return ['previous', this.slideDirection, this.slideAnimation];
    else return ['', this.slideDirection, this.slideAnimation];
  }

  private slideDirection: SlidAnimationDirectionClass = 'right-direction';
  private slideAnimation: SlidAnimationClass = 'transform-animation';
  private current = 0;
  private previous?: number;

  @HostListener('transitionend', ['$event'])
  public onAnimationFinished(event: TransitionEvent) {
    const element = event.target as HTMLElement | undefined;
    if (event.propertyName === 'transform'
      && this.slideAnimation !== ''
      && element?.classList.contains(this.slideAnimation)) {
      this.slideAnimation = '';
      this.previous = undefined;
      this.animationApplying.set(false);
      this.ref.detectChanges();
    }
  }

  public onRightClick() {
    this.moveTo(this.getNext(), 'right-direction');
  }

  public onLeftClick() {
    this.moveTo(this.getPrevious(), 'left-direction');
  }

  public readonly animationApplying = signal(false);

  public moveTo(next: number, animation?: SlidAnimationDirectionClass) {
    this.animationApplying.set(true);
    this.slideAnimation = '';
    this.ref.detectChanges();
    this.slideDirection = animation ?? this.getAnimation(next);
    this.ref.detectChanges();
    setTimeout(() => {
      this.slideAnimation = 'transform-animation';
      this.previous = this.current;
      this.current = next;
      this.ref.detectChanges();
      this._selected.set(next);
      this.selectedChange.emit(next);
    });
  }

  private getAnimation(next: number): SlidAnimationDirectionClass {
    const last = this._slides.length - 1;
    const current = this.current;
    if (next === 0 && current === last) return 'right-direction';
    return current < next ? 'right-direction' : 'left-direction';
  }

  private getPrevious(): number {
    return this.getPreviousFrom(this.current);
  }

  private getPreviousFrom(current: number): number {
    return this.normalize(current - 1);
  }

  private getNext(): number {
    return this.getNextFrom(this.current);
  }

  private getNextFrom(current: number): number {
    return this.normalize(current + 1);
  }

  private normalize(index: number) {
    //TODO normalize double range values;
    if (index < 0) return this._slides.length + index;
    if (index >= this._slides.length) return index - this._slides.length;
    else return index;
  }
}

type SliderClass = 'current' | 'previous' | '';
type SlidAnimationDirectionClass = 'left-direction' | 'right-direction' | '';
type SlidAnimationClass = 'transform-animation' | '';
