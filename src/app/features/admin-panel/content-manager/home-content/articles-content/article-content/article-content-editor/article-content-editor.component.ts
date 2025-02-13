import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Article} from "@app/features/home/services/article.repository";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-article-content-editor',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form method="dialog">
      @let v = value();
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input type="text" matInput [(ngModel)]="v.title" name="title">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="v.description" name="description"></textarea>
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="published.emit(v)" [disabled]="!v.title || !v.description">
        Publish
      </button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleContentEditorComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Article>();
  public readonly value = input.required<Article>();
}
