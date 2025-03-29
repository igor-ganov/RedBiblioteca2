import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal} from '@angular/core';
import {RouteService} from "@common/routes/RouteService";
import {ActivatedRoute} from "@angular/router";
import {TextHost} from "@common/lang-system/TextHost";
import {RouteData} from "@common/routes/routes";
import {RouteBarLinkComponent} from "@app/layout/route-bar/route-bar-link/route-bar-link.component";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {TextDictionaryService} from "@common/lang-system/TextDictionaryService";

@Component({
  selector: 'app-route-bar',
  imports: [
    RouteBarLinkComponent
  ],
  template: `
    <div class="container">
      @for (r of routes(); track r.path()) {
        <app-route-bar-link [value]="r" [isFirst]="$first" [isLast]="$last"
                            [style.--route-link-index]="routes().length - $index"/>
      }
    </div>
  `,
  styles: `
    .container {
      background: var(--background-background);
      display: flex;
      flex-direction: row;
      gap: 0.1em;

      & * {
        margin-right: -1em;
        position: relative;
        z-index: var(--route-link-index, 0);

        &:last-child {
          transition-property: translate, opacity;
          @starting-style{
            translate: -100%;
            opacity: 0;
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteBarComponent {
  private readonly routeService = inject(RouteService);
  private readonly textHost = inject(TextHost);
  private readonly localeHost = inject(LocaleHost);
  private readonly textDictionaryService = inject(TextDictionaryService);
  private readonly route = this.routeService.activatedRoute();
  public readonly routes = computed(() => getParents(this.route(), this.textHost, this.localeHost, this.textDictionaryService));
}

function getParents(route: ActivatedRoute, textHost: TextHost, localeHost: LocaleHost, textDictionaryService: TextDictionaryService): RouteBarLink[] {
  const routes = route.snapshot.pathFromRoot.slice(1).filter(p => p.routeConfig?.path !== '');
  if (routes.length <= 1) return [];
  const lang = localeHost.language;
  const links: RouteBarLink[] = [{
    path: computed(() => `/${lang()}`),
    text: computed(() => textHost.getTextSignal('home')()?.title ?? routes[0].url.join('/'))
  }];
  for (let i = 1; i < routes.length; i++) {
    const path = computed(() => links[i - 1].path() + '/' + routes[i].url.join('/'));
    const data = (routes[i].data ?? route.snapshot.routeConfig?.children?.find(c => c.path === '')?.data) as RouteData | undefined;
    const dataText = data?.header ? data.header.title : undefined;
    const dictionary = textDictionaryService.textDictionary;
    const text = dataText ? computed(() => (dictionary() ? dataText(dictionary()!) : undefined) ?? routes[i].url.join('/')) : signal(routes[i].url.join('/')).asReadonly();
    const paramMap = routes[i].paramMap;
    const param = paramMap.keys.length > 0 ? paramMap.get(paramMap.keys[0]) : undefined;
    links.push({path: path, text: param ? computed(() => `#${param}`) : text})
  }
  return links;
}

export interface RouteBarLink {
  path: Signal<string>;
  text: Signal<string>;
}
