import {Component, inject} from '@angular/core';
import {BookRepository} from './services/BookRepository';
import {map, Observable} from 'rxjs';
import {Book} from './models/Book';
import {UserService} from '@common/permission-system/UserService';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
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
