import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {BookPreviewComponent} from './book-preview/book-preview.component';
import {LoadingComponent} from '@common/components/loading/loading.component';
import {createSubscriptionService} from "@common/help/services/subscription.service";
import {rxResource} from "@angular/core/rxjs-interop";
import {Book} from "@app/features/books/models/Book";
import {BookRepository} from "@app/features/books/services/BookRepository";
import {LocaleHost} from "@common/lang-system/LocaleHost";

@Component({
  selector: 'app-books',
  template: `
    @if (collection(); as collection) {
      <div class="container">
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
    } @else {
      <app-loading/>
    }

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
  imports: [MatIconAnchor, RouterLink, MatIcon, BookPreviewComponent, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  private readonly subscriptionService = createSubscriptionService();
  private readonly userService = inject(UserService);
  public readonly readonly = computed(() => this.userService.currentUser() == undefined);
  public readonly repository = inject(BookRepository);
  private readonly lang = inject(LocaleHost).language;
  private readonly collectionResource = rxResource({
    request: () => ({lang: this.lang()}),
    loader: ({request: {lang}}) => this.repository.getAll(lang),
  });
  public readonly collection: Signal<Book[] | undefined> = computed(() => this.collectionResource.value());

  public async onDeleteRequested(value: Book) {
    await this.subscriptionService.runAsync(this.repository.delete(this.lang(), value.id));
    this.collectionResource.reload();
  }
}
