import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Book } from '../models/Book';
import { map } from 'rxjs';
import { UserService } from '@common/permission-system/UserService';
import { toBase64 } from '@common/help/help-fuctions';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  @Input({ required: true }) public isUpdating!: boolean;
  @Output() published = new EventEmitter<Book>();
  private _book!: Book;
  @Input({ required: true })
  public get book(): Book {
    return this._book;
  }
  public set book(value: Book) {
    this._book = value;
  }
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));

  onImageUploaded(event: Event, book: Book) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if(image) toBase64(image, v => book.image = v);
  }
  onPublish(book: Book) {
    this.published.next(book);
  }
}
