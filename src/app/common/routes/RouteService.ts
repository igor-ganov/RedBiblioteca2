import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router, Scroll} from "@angular/router";
import {distinctUntilChanged, filter, map, Observable, ReplaySubject, startWith, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class RouteService {
  private readonly observable = new ReplaySubject<string>(1);
  private readonly activatedRoute$ = new ReplaySubject<ActivatedRoute>(1);

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    // let route = this.activatedRoute;
    // while(route.firstChild){
    //     route = route.firstChild;
    // }
    // this.activatedRoute$.next(route);

    this.router.events
      .pipe(
        //   filter((evt: any) => evt instanceof RoutesRecognized),
        filter((evt: any) => evt instanceof Scroll && evt.routerEvent instanceof NavigationEnd),
        tap(x => console.log(x)),
        map(evt => evt as Scroll & { routerEvent: NavigationEnd }),
        //   startWith({}),
        //   pairwise(),
        // map(x => x as RoutesRecognized[]),
        // map(x => x as Scroll[]),
        map(x => x.routerEvent.urlAfterRedirects),
        startWith(this.router.url),
        //   map(x => x[1].routerEvent.urlAfterRedirects),
        // map(x => x[1].routerEvent.url),
        distinctUntilChanged(),
      ).subscribe(x => {
      this.observable.next(x);

      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.activatedRoute$.next(route);
    })

    // this.router.events
    // .pipe(
    //   filter((evt: any) => evt instanceof RoutesRecognized),
    //   tap((e : RoutesRecognized) => {
    //     let route = e.state.root;
    //     while(route.firstChild){
    //         route = route.firstChild;
    //     }
    //   }),
    // ).subscribe();

    // this.router.events
    // .pipe(
    //     filter((e: any) => e instanceof ActivationStart),
    //     map(e => e as ActivationStart),
    //     map(e => {return {component: e.snapshot.component?.name, url: e.snapshot.pathFromRoot.map(r => r.url.map(u =>u.path).join('/')).join('/')}}),
    // ).subscribe(x => {
    //     // this.observable.next(x);
    // })
  }

  getFullPath(): Observable<string> {
    return this.observable;
  }

  getActivatedRoute(): Observable<ActivatedRoute> {
    return this.activatedRoute$.pipe(distinctUntilChanged());
  }
}
