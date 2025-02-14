import {ChangeDetectionStrategy, Component, computed, inject, resource, Signal} from '@angular/core';
import {ArticleRepository} from "@app/features/home/services/article.repository";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {Result} from "@common/help/services/Result";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";
import {Article} from "@app/features/home/services/article";
import {OrderByPipe} from "@common/pipelines/order-by.pipe";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-articles-content',
  imports: [
    IfSuccess,
    RouterLink,
    MatAnchor,
    MatTableModule,
    MatButtonModule,
    OrderByPipe,
    DatePipe
  ],
  template: `
    <div *ifSuccess="articles() as articles" class="container">
      <mat-table class="table" [dataSource]="articles | orderBy: 'datePublished'">
        <ng-container matColumnDef="pid">
          <mat-header-cell *matHeaderCellDef> Id</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.pid }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.title }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="datePublished">
          <mat-header-cell *matHeaderCellDef> Publish Date</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ toDate(element.datePublished) | date: 'medium' }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="homePageOrder">
          <mat-header-cell *matHeaderCellDef> Home Page Order</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.homePageOrder }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="panel">
          <mat-header-cell *matHeaderCellDef> Panel</mat-header-cell>
          <mat-cell *matCellDef="let element">
            <a [routerLink]="[element.pid]" mat-raised-button>Open</a>
            <button (click)="onDelete(element)" mat-raised-button>Delete</button>
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesContentComponent {
  private readonly repository = inject(ArticleRepository);
  private readonly localeHost = inject(LocaleHost);
  private readonly eventMessageQueue = inject(EventMessageQueue);
  private readonly lang = this.localeHost.language;
  private readonly articleResource = resource({
    request: () => ({lang: this.lang()}),
    loader: ({request: {lang}}) => this.repository.getAll(lang)
  })
  public readonly articles: Signal<Result<Article[]> | undefined> = computed(() => this.articleResource.value());
  public readonly displayedColumns: (keyof Article | "panel")[] = ["pid", "title", "datePublished", "homePageOrder", "panel"];

  public async onDelete(value: Article) {
    const result = await this.repository.delete(this.lang(), value.id);
    if (result.successeful) {
      this.articleResource.reload();
      //TODO add event message
      this.eventMessageQueue.pushInfo('Article deleted');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
  }

  public toDate(isoString: string) {
    return new Date(isoString);
  }
}
