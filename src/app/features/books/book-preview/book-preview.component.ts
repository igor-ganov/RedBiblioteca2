import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Book } from '../models/Book';
import { map } from 'rxjs';
import { UserService } from '@common/permission-system/UserService';
import { BookRepository } from '../services/BookRepository';
import { SubscriptionHandler, SubscriptionHandlerProvider } from '@common/help/services/SubscriptionHandler';
import { MatIconButton, MatIconAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Base64ToImage } from '@common/help/pipelines/Base64ToImage';

@Component({
    selector: 'app-book-preview',
    templateUrl: './book-preview.component.html',
    styleUrl: './book-preview.component.css',
    providers: [SubscriptionHandlerProvider],
    imports: [MatIconButton, MatIcon, MatIconAnchor, RouterLink, AsyncPipe, Base64ToImage]
})
export class BookPreviewComponent implements OnDestroy {
  @Input({ required: true }) public book!: Book;
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly booksRepository = inject(BookRepository);
  private readonly subscriptionHandler = inject(SubscriptionHandler);

  public onDelete(book: Book){
    this.subscriptionHandler.subscribe(this.booksRepository.delete(book.id));
  }
  ngOnDestroy(): void {
    this.subscriptionHandler.destroy();
  }
}
