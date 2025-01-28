import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MenuService} from '@app/layout/side-menu/services/MenuServices';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-menu',
  template: `
<div class="container">
  @for (item of items | async; track item.url) {
    <button color="basic" [routerLink]="['/' + lang() + '/' + item.url]" mat-stroked-button>
      <span class="menu-text">{{ item.title }}</span>
    </button>
  }
</div>

`,
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
