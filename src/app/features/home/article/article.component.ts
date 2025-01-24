import {Component, inject, Input} from '@angular/core';
import {Article} from "@app/features/home/article/article";
import { UserService } from '@common/permission-system/UserService';
import { map } from 'rxjs';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrl: './article.component.css',
    standalone: false
})
export class ArticleComponent {
  public onPublish(article: Article) {
  }
  @Input({required: true})
  public article!: Article;

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public isUpdating!: boolean;

}


