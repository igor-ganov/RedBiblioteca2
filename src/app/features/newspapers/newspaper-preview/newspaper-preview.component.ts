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
  templateUrl: './newspaper-preview.component.html',
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
