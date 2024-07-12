import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Book } from '../models/Book';
import { map } from 'rxjs';
import { UserService } from '../../../common/permission-system/UserService';
import { BookRepository } from '../services/BookRepository';
import { SubscriptionHandler, SubscriptionHandlerProvider } from '@common/help/services/SubscriptionHandler';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css',
  providers: [SubscriptionHandlerProvider]
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
