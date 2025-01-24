import {Component, inject, OnInit} from '@angular/core';
import {BookRepository} from './services/BookRepository';
import {map, Observable} from 'rxjs';
import {Book} from './models/Book';
import {UserService} from '@common/permission-system/UserService';
import { MatIconAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { LoadingComponent } from '../../common/components/loading/loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrl: './books.component.css',
    imports: [MatIconAnchor, RouterLink, MatIcon, BookPreviewComponent, LoadingComponent, AsyncPipe]
})
export class BooksComponent implements OnInit {
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly booksRepository = inject(BookRepository);
  public books$?: Observable<Book[]>;

  ngOnInit(): void {
    setTimeout(() => {
      this.books$ = this.booksRepository.getAll();
    })
  }

  public onClick() {
    this.booksRepository.getAll().subscribe();
  }
}
