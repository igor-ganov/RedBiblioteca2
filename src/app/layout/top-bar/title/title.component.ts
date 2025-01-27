import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TextHost} from '@common/lang-system/TextHost';
import {RouteService} from '@common/routes/RouteService';
import {filter, map, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  private routeService = inject(RouteService);
  private textHost = inject(TextHost);
  public readonly title = this.routeService.activatedRoute$.pipe(
    filter(r => r.component !== undefined),
    switchMap(r => this.textHost.getMenuItem(r.component!) ?? of(undefined)),
    map(i => i?.title)
  );
}
