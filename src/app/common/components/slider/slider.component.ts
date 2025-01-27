import { Component, Input, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.css',
    imports: [NgClass]
})
export class SliderComponent {
  public readonly opened = input(true);
  private _direction: Direction = 'left';
  @Input()
  public get direction(): Direction {
    return this._direction;
  }
  public set direction(value: Direction) {
    this._direction = value;
    this.sliderOpenedClass = getSliderOpenedClass(value);
  }
  public sliderOpenedClass: SliderClass = 'slider-closed-left';
}
type SliderClass = 'slider-closed-left' | 'slider-closed-top' | 'slider-closed-right' | 'slider-closed-bottom';
type Direction = 'left' | 'top' | 'right' | 'bottom';

function getSliderOpenedClass(value: Direction): SliderClass {
  switch (value) {
    case 'left': return 'slider-closed-left';
    case 'top': return 'slider-closed-top';
    case 'right': return 'slider-closed-right';
    case 'bottom': return 'slider-closed-bottom';
  }
}
