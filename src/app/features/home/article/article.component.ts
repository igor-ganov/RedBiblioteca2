import {Component, Input} from '@angular/core';
import {Article} from "@app/features/home/article/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input({required: true})
  public article!: Article;
}


