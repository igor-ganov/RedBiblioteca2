import {inject, Injectable} from "@angular/core";
import {RouteService} from "@common/routes/RouteService";
import {combineLatest, map, Observable, tap, zip} from "rxjs";
import {Route, Router} from "@angular/router";
import {TextHost} from "@common/lang-system/TextHost";
import {IMenuItem} from "@common/menu-system/IMenuItem";
import {UserRoles} from "@common/permission-system/UserRoles";
import {RouteData} from "@common/routes/routes";
import {UserService} from "@common/permission-system/UserService";


@Injectable({providedIn: 'root'})
export class MenuService {
  private routeService = inject(RouteService);
  public activatedItem$ = this.routeService.getActivatedRoute().pipe(map(a => a.component?.name));
  private router = inject(Router);
  private textHost = inject(TextHost);
  private _allItems = zip(this.router.config.find(r => r.path !== '**')!.children!.map(r => buildMenuItem(r, this.textHost)!).filter(r => r !== undefined))

  private userService = inject(UserService);
  public items = combineLatest({
    items: this._allItems,
    role: this.userService.currentUser$.pipe(map(u => u?.roles ?? UserRoles.GUEST))
  }).pipe(
    tap(r => console.log(r)),
    map(({items, role}) => items.map(i => skipForbiden(i, role)!).filter(r => r !== undefined)),
    map(items => items.filter(i => i.type === 'item').map(i => i as MenuItemReach))
  )
}


function buildMenuItem(route: Route, textHost: TextHost): Observable<MenuItemReach | RootItem> | undefined {
  const data = route.data as RouteData | undefined;
  const item = data?.isMenuItem ? getMenuItem(route, textHost) : undefined;
  const role = data?.requiredRole ?? UserRoles.GUEST;
  const children = buildChildren(route, textHost);
  if (item && children) return zip([item, children]).pipe(
    map(([item, children]) => createReachMenuItem(item, children, route.path, role) as MenuItemReach));
  if (children) return children.pipe(map(children => {
    return {type: 'root', children: children}
  }));
  if (item) return item.pipe(
    map(i => createReachMenuItem(i, [], route.path, role)));

  return undefined;
}

function createReachMenuItem(item: IMenuItem, children: MenuItemReach[], route: string | undefined, role: UserRoles): MenuItemReach {
  return {type: 'item', title: item.title, icon: item.icon, url: route ?? '', role: role, children: children};
}

export interface RootItem {
  type: 'root',
  children: MenuItemReach[];
}

export interface MenuItemReach {
  type: 'item';
  title: string;
  icon: string;
  url: string;
  role: UserRoles;
  children: MenuItemReach[];
}

function getMenuItem(route: Route, textHost: TextHost) {
  const component = route.component ?? route.children?.find(c => c.path === '')?.component;
  if (!component) return;
  return textHost.getMenuItem(component);
}

function buildChildren(route: Route, textHost: TextHost): Observable<MenuItemReach[]> | undefined {
  const children = getChildren(route)?.map(r => buildMenuItem(r, textHost)).filter(c => c !== undefined) as Observable<MenuItemReach>[];
  return children && children.length > 0 ? zip(children) : undefined;
}

function getChildren(route: Route) {
  return route.children?.filter(c => c.path !== '').filter(r => r.path !== '**');
}

function skipForbiden(item: (MenuItemReach | RootItem), role: UserRoles): (MenuItemReach | RootItem) | undefined {
  if (item.type === 'item') return skipForbidenItem(item, role);
  const children = skipForbidenItems(item.children, role);
  return children.length > 0 ? <RootItem>{type: 'root', children: children} : undefined;
}

function skipForbidenItems(items: MenuItemReach[], role: UserRoles): MenuItemReach[] {
  return items.map(item => skipForbidenItem(item, role)!).filter(c => c !== undefined);
}

function skipForbidenItem(item: MenuItemReach, role: UserRoles): MenuItemReach | undefined {
  return item.role <= role ? item : undefined;
}

