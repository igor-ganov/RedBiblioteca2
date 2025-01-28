import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {NewspaperRepository} from './services/NewspaperRepository';
import {UserService} from '@common/permission-system/UserService';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {NewspaperPreviewComponent} from './newspaper-preview/newspaper-preview.component';
import {LoadingComponent} from '@common/components/loading/loading.component';
import {Newspaper} from "@app/features/newspapers/models/Newspaper";
import {rxResource} from "@angular/core/rxjs-interop";
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-newspapers',
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
        @for (b of collection; track b.id) {
          <div class="card">
            <app-newspaper-preview (deleteRequested)="onDeleteRequested($event)"
                                   [newspaper]="b"></app-newspaper-preview>
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
    }
  `,
  imports: [MatIconAnchor, RouterLink, MatIcon, NewspaperPreviewComponent, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspapersComponent {
  private readonly subscriptionService = createSubscriptionService();
  private readonly userService = inject(UserService);
  public readonly readonly = computed(() => this.userService.currentUser() == undefined);
  public readonly repository = inject(NewspaperRepository);
  private readonly collectionResource = rxResource({
    loader: () => this.repository.getAll()
  });
  public readonly collection: Signal<Newspaper[] | undefined> = computed(() => this.collectionResource.value());

  public async onDeleteRequested(value: Newspaper) {
    await this.subscriptionService.runAsync(this.repository.delete(value.id));
    this.collectionResource.reload();
  }
}
