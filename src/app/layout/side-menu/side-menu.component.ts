import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SideMenuService} from './services/SideMenuService';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MenuService} from './services/MenuServices';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  imports: [NgClass, MatButton, RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public readonly routes = routsPaths;

  public readonly sideMenuService = inject(SideMenuService);
  public readonly menuService = inject(MenuService);
  public readonly items = this.menuService.items;

  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
