import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AnchorComponent} from '@common/components/anchor/anchor.component';

import {Article} from "@app/features/home/services/article";

@Component({
  selector: 'app-article',
  template: `
    <div class="article scrolling-slider">
      @let value = article();
      <h2 class="title">
        <app-anchor [id]="value.id"/>
        <span>{{ value.title }}</span>
      </h2>
      <div class="text">
        <span>{{ value.content }}</span>
      </div>
    </div>
  `,
  styleUrl: './article.component.css',
  imports: [AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  public readonly article = input.required<Article>();
}


