import {ChangeDetectionStrategy, Component, inject, input, OnDestroy, output} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {SubscriptionHandler, SubscriptionHandlerProvider} from '@common/help/services/SubscriptionHandler';
import {MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';

@Component({
  selector: 'app-newspaper-preview',
  template: `
<div class="container">
  <div class="title">
    <h1 class="title-text">{{ newspaper().title }}</h1>
    <div class="title-panel">
      @if (!(readonly$ | async)) {
        <button (click)="onDelete(newspaper())" color="warn" mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
      }
      <a [routerLink]="[newspaper().pid]" mat-icon-button>
        <mat-icon>open_in_new</mat-icon>
      </a>
    </div>
  </div>
  <div class="subtitle"><h2>{{ newspaper().month }}, {{ newspaper().year }}</h2></div>
  <div class="image"><img [src]="newspaper().cover | base64toImage" fill></div>
  <div class="description"><span>{{ newspaper().description }}</span></div>
</div>

`,
  styleUrl: './newspaper-preview.component.css',
  providers: [SubscriptionHandlerProvider],
  imports: [MatIconButton, MatIcon, MatIconAnchor, RouterLink, AsyncPipe, Base64ToImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperPreviewComponent implements OnDestroy {
  public readonly newspaper = input.required<Newspaper>();
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  private readonly subscriptionHandler = inject(SubscriptionHandler);

  public readonly deleteRequested = output<Newspaper>();

  public onDelete(newspaper: Newspaper) {
    this.deleteRequested.emit(newspaper);
  }

  public ngOnDestroy(): void {
    this.subscriptionHandler.destroy();
  }
}
