import {Component, inject} from '@angular/core';
import {TextHost} from '@common/lang-system/TextHost';
import {RouteService} from '@common/routes/RouteService';
import {filter, map, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  private routeService = inject(RouteService);
  private textHost = inject(TextHost);
  title?: Observable<string | undefined>;

  ngOnInit(): void {
    this.title = this.routeService.getActivatedRoute().pipe(
      filter(r => r.component !== undefined),
      switchMap(r => this.textHost.getMenuItem(r.component!) ?? of(undefined)),
      map(i => i?.title)
    );
  }

}
