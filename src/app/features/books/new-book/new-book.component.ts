import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Book} from '../models/Book';
import {getFakeImage} from './getFakeImage';
import {BookRepository} from '../services/BookRepository';
import {finalize} from 'rxjs';
import {Router} from '@angular/router';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {BookViewComponent} from '../book-view/book-view.component';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.css',
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

  public onPublish(book: Book) {
    this.isUpdating.set(true);
    book.pid = book.title.toLocaleLowerCase().replaceAll(' ', '-').replaceAll('\n', '');
    this.repository.add(book).pipe(finalize(() => this.isUpdating.set(true))).subscribe(() => this.redirectTo(book));
  }

  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);

  private redirectTo(book: Book) {
    return this.router.navigate([this.localeHost.language() + '/' + routsPaths.books + '/' + book.pid]);
  }
}
