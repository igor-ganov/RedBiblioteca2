import {ChangeDetectionStrategy, Component, computed, inject, resource, Signal} from '@angular/core';

import {TopBannerComponent} from './top-banner/top-banner.component';
import {ContentMenuComponent} from '@app/layout/content-menu/content-menu.component';
import {ArticleComponent} from './article/article.component';
import {LastNewsComponent} from './last-news/last-news.component';
import {ArticleRepository} from "@app/features/home/services/article.repository";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result} from "@common/help/services/Result";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {Article} from "@app/features/home/services/article";
import {FilterNullByPipe} from "@common/pipelines/filter-null-by.pipe";
import {OrderByPipe} from "@common/pipelines/order-by.pipe";

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="content">
        <app-top-banner class="banner"/>
        <ng-container *ifSuccess="articles() as articles">
          @let homePageArticles = articles | filterNullBy: 'homePageOrder' | orderBy: 'homePageOrder';
          <app-content-menu [items]="homePageArticles" class="menu"/>
          <div class="articles-with-news">
            <div class="articles">
              @for (article of homePageArticles; track article.id) {
                <app-article [article]="article"/>
              }
            </div>
            <div class="news">
              <div class="shadow-box"> <!-- TODO move to shared component or css -->
                <app-last-news/>
              </div>
            </div>
          </div>
        </ng-container>

      </div>
    </div>

  `,
  styleUrl: './home.component.css',
  imports: [TopBannerComponent, ContentMenuComponent, ArticleComponent, LastNewsComponent, IfSuccess, FilterNullByPipe, OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  private readonly repository = inject(ArticleRepository);
  private readonly localeHost = inject(LocaleHost);
  private readonly lang = this.localeHost.language;
  private readonly articleResource = resource({
    request: () => ({lang: this.lang()}),
    loader: ({request: {lang}}) => this.repository.getAll(lang)
  })
  public readonly articles: Signal<Result<Article[]> | undefined> = computed(() => this.articleResource.value());
}
