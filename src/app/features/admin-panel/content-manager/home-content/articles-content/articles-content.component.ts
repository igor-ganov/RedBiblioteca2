import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ArticleRepository} from "@app/features/home/services/article.repository";

@Component({
  selector: 'app-articles-content',
  imports: [],
  template: `

  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesContentComponent {
  private readonly repository = inject(ArticleRepository);

}
