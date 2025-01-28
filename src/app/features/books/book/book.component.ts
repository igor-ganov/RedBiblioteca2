import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Book} from '../models/Book';
import {ActivatedRoute} from '@angular/router';
import {BookRepository} from '../services/BookRepository';
import {finalize} from 'rxjs';
import {errorThrow} from '@common/help/help-fuctions';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {BookViewComponent} from '../book-view/book-view.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-book',
  template: `
<app-book-view *ifSuccess="book$ | async as result" [book]="result" [isUpdating]="isUpdating()"
               (published)="onPublish($event)"/>

`,
  styleUrl: './book.component.css',
  imports: [IfSuccess, BookViewComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {

  public readonly isUpdating = signal(false);

  public onPublish(value: Book) {
    this.isUpdating.set(true);
    this.repository.update(value).pipe(finalize(() => this.isUpdating.set(false))).subscribe();//todo update view;
  }

  private readonly bookId = inject(ActivatedRoute).snapshot.paramMap.get('bookId') ?? errorThrow("Book's Id can't be empty")!;
  private readonly repository = inject(BookRepository);
  public readonly book$ = this.repository.findByPid(this.bookId);
}
