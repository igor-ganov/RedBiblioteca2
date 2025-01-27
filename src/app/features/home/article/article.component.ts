import {Component, inject, input} from '@angular/core';
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
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  imports: [AnchorComponent, TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe]
})
export class ArticleComponent {
  public onPublish(article: Article) {
    console.log(article);
  }

  public readonly article = input.required<Article>();

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public isUpdating!: boolean;

}


