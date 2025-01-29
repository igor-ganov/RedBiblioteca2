import {ChangeDetectionStrategy, Component, inject, input, resource, Signal, signal} from '@angular/core';
import {Book} from '../models/Book';
import {BookRepository} from '../services/BookRepository';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {BookViewComponent} from '../book-view/book-view.component';
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result} from "@common/help/services/Result";
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";

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
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onPublish(value: Book) {
    this.isUpdating.set(true);
    const result = await this.repository.update(this.lang(), value);
    if (result.successeful) {
      //todo update view;
      this.eventMessageQueue.pushInfo('Book updated');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
    this.isUpdating.set(false);
  }

  public readonly bookId = input.required<string>();
  private readonly repository = inject(BookRepository);
  private readonly bookResource = resource({
    request: () => ({id: this.bookId(), lang: this.lang()}),
    loader: ({request: {id, lang}}) => this.repository.findByPid(lang, id),
  });
  public readonly book: Signal<Result<Book> | undefined> = this.bookResource.value.asReadonly();
}
