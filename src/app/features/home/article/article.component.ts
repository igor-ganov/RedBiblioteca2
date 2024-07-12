import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input({required: true})
  public article!: Article;
}


export interface Article{
  id: string;
  title: string;
  content: string;
}

