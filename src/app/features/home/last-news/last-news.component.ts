import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, signal} from '@angular/core';
import {Slide} from '@common/components/slide-show/Slides';
import {repeat, Subscription, timer} from 'rxjs';
import {getFakeImage1, getFakeImage2, getFakeImage3} from './getFakeImage1';
import {SlideShowComponent} from '@common/components/slide-show/slide-show.component';

@Component({
  selector: 'app-last-news',
  template: `
    <app-slide-show [slides]="sources" [(selected)]="selected"/>
  `,
  styleUrl: './last-news.component.css',
  imports: [SlideShowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastNewsComponent implements AfterViewInit, OnDestroy {
  public constructor(private readonly detector: ChangeDetectorRef) {
  }

  public readonly sources: LastNews[] = [
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
  private readonly _selected = signal(0);
  public get selected(): number {
    return this._selected();
  }

  public set selected(value: number) {
    this._selected.set(value);
  }

  private slideChangeTimer?: Subscription;

  public ngAfterViewInit(): void {
    this.slideChangeTimer = timer(4000).pipe(repeat()).subscribe(() => this.incrementPage());
  }

  public incrementPage(): void {
    this.selected++;
    this.detector.detectChanges();
  }

  public ngOnDestroy(): void {
    this.slideChangeTimer?.unsubscribe();
  }
}

export type LastNews = Slide;

