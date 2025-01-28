import {ChangeDetectionStrategy, Component, inject, Signal, signal} from '@angular/core';
import {Book} from '../models/Book';
import {ActivatedRoute} from '@angular/router';
import {BookRepository} from '../services/BookRepository';
import {finalize} from 'rxjs';
import {errorThrow} from '@common/help/help-fuctions';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {BookViewComponent} from '../book-view/book-view.component';
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {rxResource} from "@angular/core/rxjs-interop";
import {Result} from "@common/help/services/Result";

@Component({
  selector: 'app-book',
  template: `
    @let result = book();
    <app-book-view *ifSuccess="result as value" [book]="value" [isUpdating]="isUpdating()"
                   (published)="onPublish($event)"/>
  `,
  styleUrl: './book.component.css',
  imports: [IfSuccess, BookViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {

  public readonly isUpdating = signal(false);
  private readonly lang = inject(LocaleHost).language;

  public onPublish(value: Book) {
    this.isUpdating.set(true);
    this.repository.update(this.lang(), value).pipe(finalize(() => this.isUpdating.set(false))).subscribe();//todo update view;
  }

  private readonly bookId = inject(ActivatedRoute).snapshot.paramMap.get('bookId') ?? errorThrow("Book's Id can't be empty")!;
  private readonly repository = inject(BookRepository);
  private readonly bookResource = rxResource({
    request: () => ({id: this.bookId, lang: this.lang()}),
    loader: ({request: {id, lang}}) => this.repository.findByPid(lang, id),
  });
  public readonly book: Signal<Result<Book> | undefined> = this.bookResource.value.asReadonly();
}
