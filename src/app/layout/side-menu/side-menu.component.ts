import {Component, inject, OnInit} from '@angular/core';
import {SideMenuService} from './services/SideMenuService';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {Observable} from 'rxjs';
import {MenuItemReach, MenuService} from './services/MenuServices';
import {UserService} from '@common/permission-system/UserService';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  public routes = routsPaths;
  public items?: Observable<(MenuItemReach)[]>;

  constructor(public readonly sideMenuService: SideMenuService) {
  }

  public menuService = inject(MenuService);
  public userService = inject(UserService);

  public localeHost = inject(LocaleHost);
  public lang$?: Observable<string>;

  ngOnInit(): void {
    // this.menuService.items.subscribe(r => printAll(r));
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();

      //TODO pass lang WITH URL of Item
      this.items = this.menuService.items;
    })
  }
}
