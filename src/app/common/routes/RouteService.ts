import {Injectable, signal} from "@angular/core";
import {distinctUntilChanged, filter, map, startWith} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {toObservable} from "@angular/core/rxjs-interop";

@Injectable({providedIn: 'root'})
export class RouteService {
  private readonly _fullPath = signal<string>('');
  private readonly _activatedRoute = signal<ActivatedRoute>(this.baseActivatedRoute);

  public constructor(
    private readonly router: Router,
    private readonly baseActivatedRoute: ActivatedRoute,
  ) {

    this.router.events
      .pipe(
        filter((evt: unknown) => evt instanceof NavigationEnd),
        // filter((evt: unknown) => evt instanceof Scroll && evt.routerEvent instanceof NavigationEnd),
        // map(evt => evt as Scroll & { routerEvent: NavigationEnd }),
        // map(x => x.routerEvent.urlAfterRedirects),
        map(x => x.urlAfterRedirects),
        startWith(this.router.url),
        distinctUntilChanged(),
      ).subscribe(x => {
      this._fullPath.set(x);
      // this._fullPath$.next(x);

      let route = this.baseActivatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this._activatedRoute.set(route);
    })
  }

  public readonly fullPath = this._fullPath.asReadonly();
  public readonly fullPath$ = toObservable(this._fullPath);

  public readonly activatedRoute$ = toObservable(this._activatedRoute);
  public readonly activatedRoute = this._activatedRoute.asReadonly;

}
