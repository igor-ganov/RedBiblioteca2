import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MenuService} from '@app/layout/side-menu/services/MenuServices';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css',
  imports: [MatButton, RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  public readonly menuService = inject(MenuService);
  public readonly items = this.menuService.items;
  public readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
