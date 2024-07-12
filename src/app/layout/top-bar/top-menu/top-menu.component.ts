import { Component, inject } from '@angular/core';
import { MenuItemReach, MenuService } from '@app/layout/side-menu/services/MenuServices';
import { LocaleHost } from '@common/lang-system/LocaleHost';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  public menuService = inject(MenuService);
  public items?: Observable<(MenuItemReach)[]>;
  public localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;
  ngOnInit(): void {
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();

      this.items = this.menuService.items;
    })
  }
}
