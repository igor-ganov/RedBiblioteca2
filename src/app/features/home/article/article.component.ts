import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {Article} from "@app/features/home/article/article";
import {UserService} from '@common/permission-system/UserService';
import {map} from 'rxjs';
import {AnchorComponent} from '@common/components/anchor/anchor.component';
import {TextEditorComponent} from '@common/components/text-editor/text-editor.component';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-article',
  template: `
<div class="article scrolling-slider">
  @let readonly = readonly$ | async;
  @let value = article();
  <h2 class="title">
    <app-anchor [id]="value.id"/>
    @if (readonly) {
      <span>{{ value.title }}</span>
    } @else {
      <app-text-editor [inline]="true" [(value)]="value.title"/>
    }
  </h2>
  <div class="text">
    @if (readonly) {
      <span>{{ value.content }}</span>
    } @else {
      <app-text-editor [(value)]="value.content"/>
    }
  </div>
  @if (!readonly) {
    <button [disabled]="isUpdating()" color="primary" mat-stroked-button (click)="onPublish(value)">
      @if (!isUpdating()) {
        <span>Publish</span>
      } @else {
        <mat-spinner [diameter]="20"/>
      }
    </button>
  }
</div>

`,
  styleUrl: './article.component.css',
  imports: [AnchorComponent, TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  public onPublish(article: Article) {
    console.log(article);
  }

  public readonly article = input.required<Article>();

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly isUpdating = signal(false);

}


