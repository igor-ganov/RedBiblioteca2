import {ChangeDetectionStrategy, Component, inject, input, OnDestroy} from '@angular/core';
import {Book} from '../models/Book';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {BookRepository} from '../services/BookRepository';
import {SubscriptionHandler, SubscriptionHandlerProvider} from '@common/help/services/SubscriptionHandler';
import {MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css',
  providers: [SubscriptionHandlerProvider],
  imports: [MatIconButton, MatIcon, MatIconAnchor, RouterLink, AsyncPipe, Base64ToImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPreviewComponent implements OnDestroy {
  public readonly book = input.required<Book>();
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly booksRepository = inject(BookRepository);
  private readonly subscriptionHandler = inject(SubscriptionHandler);

  public onDelete(book: Book) {
    this.subscriptionHandler.subscribe(this.booksRepository.delete(book.id));
  }

  public ngOnDestroy(): void {
    this.subscriptionHandler.destroy();
  }
}
