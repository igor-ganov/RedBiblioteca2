import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { Book } from '../models/Book';
import { map } from 'rxjs';
import { UserService } from '@common/permission-system/UserService';
import { toBase64 } from '@common/help/help-fuctions';
import { TextEditorComponent } from '../../../common/components/text-editor/text-editor.component';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { Base64ToImage } from '@common/help/pipelines/Base64ToImage';

@Component({
    selector: 'app-book-view',
    templateUrl: './book-view.component.html',
    styleUrl: './book-view.component.css',
    imports: [TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe, Base64ToImage]
})
export class BookViewComponent {
  public readonly isUpdating = input.required<boolean>();
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
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if(image) toBase64(image, v => book.image = v);
  }
  onPublish(book: Book) {
    this.published.next(book);
  }
}
