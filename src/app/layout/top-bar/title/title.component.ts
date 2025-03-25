import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TextHost} from '@common/lang-system/TextHost';
import {RouteService} from '@common/routes/RouteService';
import {map, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouteData} from "@common/routes/routes";

@Component({
  selector: 'app-title',
  template: `
    @if (title | async; as title) {
      <h1 class="header">{{ title }}</h1>
    }
  `,
  styleUrl: './title.component.css',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  private routeService = inject(RouteService);
  private textHost = inject(TextHost);
  public readonly title = this.routeService.activatedRoute$.pipe(
    switchMap(a => a.data),
    map(d => d as RouteData),
    map(d => d.textTag),
    switchMap(r => this.textHost.getMenuItem(r) ?? of(undefined)),
    map(i => i?.title)
  );
}
