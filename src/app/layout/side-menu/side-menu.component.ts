import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SideMenuService } from './services/SideMenuService';
import { routsPaths } from '../../common/routes/routes';
import { LocaleHost } from '../../common/lang-system/LocaleHost';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { MenuItemReach, MenuService, RootItem } from './services/MenuServices';
import { UserService } from '@common/permission-system/UserService';
import { UserRoles } from '@common/permission-system/UserRoles';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public routes = routsPaths;
  public items?: Observable<(MenuItemReach)[]>;
  constructor(public readonly sideMenuService: SideMenuService){}

  public menuService = inject(MenuService);
  public userService = inject(UserService);

  public localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;
  ngOnInit(): void {
    // this.menuService.items.subscribe(r => printAll(r));
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();

      //TODO pass lang WITH URL of Item
      this.items = this.menuService.items;
    })
  }
}
function printAll(items: (MenuItemReach | RootItem)[]): void {
}

