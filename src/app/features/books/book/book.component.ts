import { Component, inject } from '@angular/core';
import { Book } from '../models/Book';
import { ActivatedRoute } from '@angular/router';
import { BookRepository } from '../services/BookRepository';
import { Observable, finalize } from 'rxjs';
import { errorThrow } from '@common/help/help-fuctions';
import { Result } from "@common/help/services/Result";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  public isUpdating = false;
  onPublish(value: Book) {
    this.isUpdating = true;
    this.repository.update(value).pipe(finalize(() => this.isUpdating = false)).subscribe();//todo update view;
  }

  private readonly bookId = inject(ActivatedRoute).snapshot.paramMap.get('bookId') ?? errorThrow("Book's Id can't be empty")!;
  private repository = inject(BookRepository);
  public book$?: Observable<Result<Book>>;
  ngOnInit(): void {
    this.book$ = this.repository.findByPid(this.bookId);
  }
}
