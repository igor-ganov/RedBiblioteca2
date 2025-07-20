import {ChangeDetectionStrategy, Component, computed, inject, resource, Signal} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {OrderByPipe} from "@common/pipelines/order-by.pipe";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";
import {Result} from "@common/help/services/Result";
import {Article} from "@features/home/services/article";
import {ConfirmationDirectiveDirective} from "@common/confirmation/confirmation-directive.directive";
import {NewspaperRepository} from "@features/newspapers/services/NewspaperRepository";
import {Newspaper} from "@features/newspapers/models/Newspaper";

@Component({
  selector: 'app-newspapers-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ifSuccess="items() as items" class="container">
      <mat-table class="table" [dataSource]="items | orderBy: 'year':'month'">
        <ng-container matColumnDef="pid">
          <mat-header-cell *matHeaderCellDef> Id</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.pid }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.title }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="year">
          <mat-header-cell *matHeaderCellDef> Year</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.year }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="month">
          <mat-header-cell *matHeaderCellDef> Month</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.month }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="panel">
          <mat-header-cell *matHeaderCellDef> Panel</mat-header-cell>
          <mat-cell *matCellDef="let element">
            <a [routerLink]="[element.pid]" mat-raised-button>Open</a>
            <button (appConfirmed)="onDelete(element)" mat-raised-button>Delete</button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
      <div class="panel">
        <a mat-raised-button [routerLink]="['new']">Add</a>
      </div>
    </div>
  `,
  imports: [
    IfSuccess,
    RouterLink,
    MatAnchor,
    MatTableModule,
    MatButtonModule,
    OrderByPipe,
    ConfirmationDirectiveDirective
  ],
  styles: [`

  `]
})
export class NewspapersContentComponent {
  private readonly repository = inject(NewspaperRepository);
  private readonly localeHost = inject(LocaleHost);
  private readonly eventMessageQueue = inject(EventMessageQueue);
  private readonly lang = this.localeHost.language;
  private readonly resource = resource({
    params: () => ({lang: this.lang()}),
    loader: ({params: {lang}}) => this.repository.getAll(lang)
  })
  public readonly items: Signal<Result<Newspaper[]> | undefined> = computed(() => this.resource.value());
  public readonly displayedColumns: (keyof Newspaper | "panel")[] = ["pid", "title", "month", "year", 'panel'];

  public async onDelete(value: Article) {
    const result = await this.repository.delete(this.lang(), value.id);
    if (result.successeful) {
      this.resource.reload();
      this.eventMessageQueue.pushInfo('Article deleted');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
  }

  public toDate(isoString: string) {
    return new Date(isoString);
  }
}
