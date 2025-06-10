import {ChangeDetectionStrategy, Component, computed, inject, resource, Signal} from '@angular/core';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {BookPreviewComponent} from './book-preview/book-preview.component';
import {Book} from "@app/features/books/models/Book";
import {BookRepository} from "@app/features/books/services/BookRepository";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result} from "@common/help/services/Result";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Component({
  selector: 'app-books',
  template: `
    <div *ifSuccess="result() as collection" class="container">
      @if (!readonly()) {
        <div class="title-panel">
          <a mat-icon-button [routerLink]="['new']">
            <mat-icon>add</mat-icon>
          </a>
        </div>
      }
      @for (item of collection; track item.id) {
        <div class="card">
          <app-book-preview
            (deleteRequested)="onDeleteRequested($event)"
            [value]="item"/>
        </div>
      }
    </div>


  `,
  styles: `
    .container {
      width: 100%;
      display: grid;
      justify-content: center;
    }

    .card {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .title-panel {
      display: grid;
      justify-content: flex-end;
      grid-auto-flow: column;
    }`,
  imports: [MatIconAnchor, RouterLink, MatIcon, BookPreviewComponent, IfSuccess],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  private readonly userService = inject(UserService);
  public readonly readonly = computed(() => this.userService.currentUser() == undefined);
  public readonly repository = inject(BookRepository);
  private readonly lang = inject(LocaleHost).language;
  private readonly collectionResource = resource({
    params: () => ({lang: this.lang()}),
    loader: ({params: {lang}}) => this.repository.getAll(lang),
  });
  public readonly result: Signal<Result<Book[]> | undefined> = computed(() => this.collectionResource.value());

  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onDeleteRequested(value: Book) {
    const result = await this.repository.delete(this.lang(), value.id);
    if (result.successeful) {
      this.collectionResource.reload();
      this.eventMessageQueue.pushInfo('Book deleted');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
  }
}
