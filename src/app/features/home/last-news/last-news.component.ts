import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Slide} from '@common/components/slide-show/Slides';
import {repeat, Subscription, timer} from 'rxjs';
import {getFakeImage1, getFakeImage2, getFakeImage3} from './getFakeImage1';

@Component({
  selector: 'app-last-news',
  templateUrl: './last-news.component.html',
  styleUrl: './last-news.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastNewsComponent {
  constructor(private readonly detector: ChangeDetectorRef) {
  }

  sources: LastNews[] = [
    {
      id: '1',
      title: 'The revolution history',
      description: 'Meeting dedicated to revolution',
      image: getFakeImage1(),
    },
    {
      id: '2',
      title: 'The new book: The crisys of the ordenation',
      description: 'Meeting dedicated to revolution',
      image: getFakeImage2(),

    },
    {
      id: '3',
      title: 'Other news',
      description: 'Meeting dedicated to revolution',
      image: getFakeImage3(),
    },
  ]
  private _selected: number = 0;
  public get selected(): number {
    return this._selected;
  }

  public set selected(value: number) {
    this._selected = value;
  }

  slideChangeTimer?: Subscription;

  ngAfterViewInit(): void {
    this.slideChangeTimer = timer(4000).pipe(repeat()).subscribe(() => this.incrementPage());
  }

  incrementPage(): void {
    this.selected++;
    this.detector.detectChanges();
  }

  ngOnDestroy(): void {
    this.slideChangeTimer?.unsubscribe();
  }
}

export interface LastNews extends Slide {
}

