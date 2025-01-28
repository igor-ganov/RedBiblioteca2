import {ChangeDetectionStrategy, Component, inject, input, linkedSignal, output} from '@angular/core';
import {Book} from '../models/Book';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {toBase64} from '@common/help/help-fuctions';
import {TextEditorComponent} from '@common/components/text-editor/text-editor.component';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';

@Component({
  selector: 'app-book-view',
  template: `
    <div class="container">
      @if (book(); as book) {
        <div class="card">
          @if (readonly$ | async) {
            <div class="title"><h1 class="title-text">{{ book.title }}</h1></div>
            <div class="subtitle"><h2>{{ book.author }}</h2></div>
            <div class="image"><img [src]="book.image | base64toImage" alt="cover"></div>
            <div class="description"><span>{{ book.description }}</span></div>
          } @else {
            <div class="title">
              <h1 class="title-text">
                <app-text-editor [(value)]="book.title"/>
              </h1>
            </div>
            <div class="subtitle">
              <h2>
                <app-text-editor [(value)]="book.author"/>
              </h2>
            </div>
            <div class="image">
              <input #importImage hidden type="file" onclick="this.value=null"
                     (change)="onImageUploaded($event)" [accept]="'image/*'"/>
              <img class="editable-image"
                   tabindex="0"
                   (click)="importImage.click()"
                   (keydown.enter)="importImage.click()"
                   [src]="cover() | base64toImage" alt="cover">
            </div>
            <div class="description">
              <app-text-editor [buttonPositions]="'top'" [(value)]="book.description"/>
            </div>
            <div class="buttons">
              <button [disabled]="isUpdating()" color="primary" mat-stroked-button (click)="onPublish(book)">
                @if (!isUpdating()) {
                  <span>Publish</span>
                } @else {
                  <mat-spinner [diameter]="20"/>
                }
              </button>
            </div>
          }
        </div>
      }
    </div>

  `,
  styleUrl: './book-view.component.css',
  imports: [TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe, Base64ToImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Book>();

  public readonly book = input.required<Book>();
  public readonly cover = linkedSignal(() => this.book().image);

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));

  public onImageUploaded(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if (image) toBase64(image, v => this.cover.set(v));
  }

  public onPublish(book: Book) {
    book.image = this.cover();
    this.published.emit(book);
  }
}
