import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {Slide} from './Slides';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideShowComponent {
  constructor(private ref: ChangeDetectorRef) {
  }


  // private readonly changeDetector: ChangeDetectorRef = Inject(ChangeDetectorRef);

  private _slides!: Slide[];
  @Input({required: true})
  public get slides(): Slide[] {
    return this._slides;
  }

  public set slides(value: Slide[]) {
    this._slides = value;
    this.current = 0;
  }

  private _selected: number = 0;
  @Input()
  public get selected(): number {
    return this._selected;
  }

  public set selected(value: number) {
    if (this.animationApplying) {
      this.selectedChange.emit(this._selected);
    }
    const newValue = this.normalize(value);
    if (this._selected === newValue) return;
    this._selected = newValue;
    this.moveTo(newValue);
    this.selectedChange.emit(newValue);
  }

  @Output() selectedChange = new EventEmitter<number>();

  public getClass(slide: Slide): [SliderClass, SlidAnimationDirectionClass, SlidAnimationClass] {
    if (this.slides[this.current] === slide) return ['current', this.slideDirection, this.slideAnimation];
    if (this.previous !== undefined && this.slides[this.previous] === slide) return ['previous', this.slideDirection, this.slideAnimation];
    else return ['', this.slideDirection, this.slideAnimation];
  }

  private slideDirection: SlidAnimationDirectionClass = 'right-direction';
  private slideAnimation: SlidAnimationClass = 'transform-animation';
  private current: number = 0;
  private previous?: number;

  @HostListener('transitionend', ['$event'])
  onAnimationFinished(event: TransitionEvent) {
    const element = event.target as HTMLElement | undefined;
    if (event.propertyName === 'transform'
      && this.slideAnimation !== ''
      && element?.classList.contains(this.slideAnimation)) {
      this.slideAnimation = '';
      this.previous = undefined;
      this.animationApplying = false;
      this.ref.detectChanges();
    }
  }

  onRightClick() {
    this.moveTo(this.getNext(), 'right-direction');

  }

  onLeftClick() {
    this.moveTo(this.getPrevious(), 'left-direction');
  }

  public animationApplying = false;

  moveTo(next: number, animation?: SlidAnimationDirectionClass) {
    this.animationApplying = true;
    this.slideAnimation = '';
    this.ref.detectChanges();
    this.slideDirection = animation ?? this.getAnimation(next);
    this.ref.detectChanges();
    setTimeout(() => {
      this.slideAnimation = 'transform-animation';
      this.previous = this.current;
      this.current = next;
      this.ref.detectChanges();
      this._selected = next;
      this.selectedChange.emit(next);
    });
  }

  getAnimation(next: number): SlidAnimationDirectionClass {
    const last = this._slides.length - 1;
    const current = this.current;
    if (next === 0 && current === last) return 'right-direction';
    return current < next ? 'right-direction' : 'left-direction';
  }

  getPrevious(): number {
    return this.getPreviousFrom(this.current);
  }

  getPreviousFrom(current: number): number {
    return this.normalize(current - 1);
  }

  getNext(): number {
    return this.getNextFrom(this.current);
  }

  getNextFrom(current: number): number {
    return this.normalize(current + 1);
  }

  normalize(index: number) {
    //TODO normalize double range values;
    if (index < 0) return this._slides.length + index;
    if (index >= this._slides.length) return index - this._slides.length;
    else return index;
  }
}

type SliderClass = 'current' | 'previous' | '';
type SlidAnimationDirectionClass = 'left-direction' | 'right-direction' | '';
type SlidAnimationClass = 'transform-animation' | '';
