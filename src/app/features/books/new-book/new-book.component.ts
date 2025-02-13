import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Book} from '../models/Book';
import {getFakeImage} from './getFakeImage';
import {BookRepository} from '../services/BookRepository';
import {Router} from '@angular/router';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {BookViewComponent} from '../book-view/book-view.component';
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";

@Component({
  selector: 'app-new-book',
  template: `
    <app-book-view [book]="book" [isUpdating]="isUpdating()" (published)="onPublish($event)"/>
  `,
  styles: ``,
  imports: [BookViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBookComponent {
  public readonly book: Book = {
    id: '',
    title: 'Title',
    author: 'Author',
    description: 'Description',
    pid: 'title',
    image: getFakeImage(),
  }
  private readonly repository = inject(BookRepository);
  public readonly isUpdating = signal(false);
  private readonly localeHost = inject(LocaleHost);
  private readonly lang = this.localeHost.language;
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onPublish(book: Book) {
    this.isUpdating.set(true);
    book.pid = book.title.toLocaleLowerCase().replaceAll(' ', '-').replaceAll('\n', '');
    //TODO pid unique validation
    const result = await this.repository.add(this.lang(), book);
    this.isUpdating.set(false);
    if (result.successeful) {
      await this.redirectTo(book);
      this.eventMessageQueue.pushInfo('Book added');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
  }

  private readonly router = inject(Router);

  private redirectTo(book: Book) {
    return this.router.navigate([this.lang() + '/' + routsPaths.books + '/' + book.pid]);
  }
}
