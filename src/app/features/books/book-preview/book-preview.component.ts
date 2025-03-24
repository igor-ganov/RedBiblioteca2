import {ChangeDetectionStrategy, Component, computed, inject, input, output} from '@angular/core';
import {Book} from '../models/Book';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';
import {ConfirmationDirectiveDirective} from "@common/confirmation/confirmation-directive.directive";

@Component({
  selector: 'app-book-preview',
  template: `
    @let v = value();
    <div class="container">
      <div class="title">
        <h1 class="title-text">{{ v.title }}</h1>
        <div class="title-panel">
          @if (!readonly()) {
            <button (appConfirmed)="onDelete(v)" color="warn" mat-icon-button>
              <mat-icon>delete</mat-icon>
            </button>
          }
          <a [routerLink]="[v.pid]" mat-icon-button>
            <mat-icon>open_in_new</mat-icon>
          </a>
        </div>
      </div>
      <div class="subtitle"><h2>{{ v.author }}</h2></div>
      <div class="image"><img [src]="v.image | base64toImage" alt="cover"></div>
      <div class="description"><span>{{ v.description }}</span></div>
    </div>

  `,
  styleUrl: './book-preview.component.css',
  imports: [MatIconButton, MatIcon, MatIconAnchor, RouterLink, Base64ToImage, ConfirmationDirectiveDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPreviewComponent {
  public readonly value = input.required<Book>();
  private readonly userService = inject(UserService);
  public readonly readonly = computed(() => this.userService.currentUser() == undefined);

  public readonly deleteRequested = output<Book>();

  public onDelete(value: Book) {
    this.deleteRequested.emit(value);
  }
}
