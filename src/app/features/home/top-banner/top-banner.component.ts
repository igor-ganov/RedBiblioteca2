import {ChangeDetectionStrategy, Component, inject, resource, Signal} from '@angular/core';
import {HomeBanner, HomeBannerRepository} from "@app/features/home/services/banner.repository";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {Result} from "@common/help/services/Result";

@Component({
  selector: 'app-top-banner',
  template: `
    <div class="container">
      <div *ifSuccess="banner() as banner" class="banner">
        <div class="title-panel">
          <div class="title">{{ banner.title }}</div>
          <div class="description">{{ banner.subtitle }}</div>
        </div>
        <div class="quote">{{ banner.content }}</div>
      </div>
    </div>
  `,
  styleUrl: './top-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IfSuccess
  ]
})
export class TopBannerComponent {
  private readonly homeBannerRepository = inject(HomeBannerRepository);
  private readonly localeHost = inject(LocaleHost);
  private readonly homeBannerResource = resource({
    params: () => ({lang: this.localeHost.language()}),
    loader: ({params: {lang}}) => this.homeBannerRepository.get(lang),
  })
  public readonly banner: Signal<Result<HomeBanner> | undefined> = this.homeBannerResource.value.asReadonly()
}
