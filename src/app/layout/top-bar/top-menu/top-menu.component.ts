import { Component, inject, OnInit } from '@angular/core';
import { MenuItemReach, MenuService } from '@app/layout/side-menu/services/MenuServices';
import { LocaleHost } from '@common/lang-system/LocaleHost';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrl: './top-menu.component.css',
    imports: [MatButton, RouterLink, AsyncPipe]
})
export class TopMenuComponent implements OnInit {
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
