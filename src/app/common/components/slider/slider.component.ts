import {ChangeDetectionStrategy, Component, Input, input, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-slider',
  template: `
<div class="container" [ngClass]="opened() ? '' : 'container-close'">
    <div class="slider" [ngClass]="opened() ? 'slider-opened' : sliderOpenedClass">
        <ng-content/>
    </div>
</div>
`,
  styleUrl: './slider.component.css',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  public readonly opened = input(true);
  private readonly _direction = signal<Direction>('left');
  @Input()
  public get direction(): Direction {
    return this._direction();
  }

  public set direction(value: Direction) {
    this._direction.set(value);
    this.sliderOpenedClass = getSliderOpenedClass(value);
  }

  public sliderOpenedClass: SliderClass = 'slider-closed-left';
}

type SliderClass = 'slider-closed-left' | 'slider-closed-top' | 'slider-closed-right' | 'slider-closed-bottom';
type Direction = 'left' | 'top' | 'right' | 'bottom';

function getSliderOpenedClass(value: Direction): SliderClass {
  switch (value) {
    case 'left':
      return 'slider-closed-left';
    case 'top':
      return 'slider-closed-top';
    case 'right':
      return 'slider-closed-right';
    case 'bottom':
      return 'slider-closed-bottom';
  }
}
