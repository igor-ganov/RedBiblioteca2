import {ChangeDetectionStrategy, Component, computed, inject, resource, Signal} from '@angular/core';
import {NewspaperRepository} from './services/NewspaperRepository';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {NewspaperPreviewComponent} from './newspaper-preview/newspaper-preview.component';
import {Newspaper} from "@app/features/newspapers/models/Newspaper";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result} from "@common/help/services/Result";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Component({
  selector: 'app-newspapers',
  template: `
    <div *ifSuccess="result() as collection" class="container">
      @if (!readonly()) {
        <div class="title-panel">
          <a mat-icon-button [routerLink]="['new']">
            <mat-icon>add</mat-icon>
          </a>
        </div>
      }
      @for (b of collection; track b.id) {
        <div class="card">
          <app-newspaper-preview (deleteRequested)="onDeleteRequested($event)"
                                 [value]="b"></app-newspaper-preview>
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
    }
  `,
  imports: [MatIconAnchor, RouterLink, MatIcon, NewspaperPreviewComponent, IfSuccess],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspapersComponent {
  private readonly userService = inject(UserService);
  public readonly readonly = computed(() => this.userService.currentUser() == undefined);
  public readonly repository = inject(NewspaperRepository);
  private readonly lang = inject(LocaleHost).language;
  private readonly collectionResource = resource({
    request: () => ({lang: this.lang()}),
    loader: ({request: {lang}}) => this.repository.getAll(lang)
  });
  public readonly result: Signal<Result<Newspaper[]> | undefined> = computed(() => this.collectionResource.value());

  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onDeleteRequested(value: Newspaper) {
    const result = await this.repository.delete(this.lang(), value.id);
    if (result.successeful) {
      this.collectionResource.reload();
      this.eventMessageQueue.pushInfo('Newspaper deleted');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
  }
}
