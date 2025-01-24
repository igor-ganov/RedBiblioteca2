import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {routsPaths} from "@common/routes/routes";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-content-manager',
  template: `
    <div class="container">
      <mat-table class="table" [dataSource]="[{title: 'Home content', panel: this.homeContent}]">

        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
          <mat-cell *matCellDef="let element"> {{ element.title }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="panel">
          <mat-header-cell *matHeaderCellDef> Panel</mat-header-cell>
          <mat-cell *matCellDef="let element">
            <a [routerLink]="[element.panel]" mat-raised-button>Open</a>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `,
  styles: `
    .container {
      padding: 3em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .table {
      width: fit-content;
      min-width: 500px;
    }
  `,
  standalone: true,
  imports: [
    RouterLink,
    MatAnchor,
    MatTableModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentManagerComponent {
  public readonly homeContent = routsPaths.homeContent;
  public readonly displayedColumns = ['title', 'panel'];
}
