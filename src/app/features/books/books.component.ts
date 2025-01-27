import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BookRepository} from './services/BookRepository';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {BookPreviewComponent} from './book-preview/book-preview.component';
import {LoadingComponent} from '@common/components/loading/loading.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  imports: [MatIconAnchor, RouterLink, MatIcon, BookPreviewComponent, LoadingComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly booksRepository = inject(BookRepository);
  public readonly books$ = this.booksRepository.getAll();

  public onClick() {
    this.booksRepository.getAll().subscribe();
  }
}
