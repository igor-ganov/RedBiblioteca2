import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {SideMenuButtonComponent} from '../side-menu/side-menu-button/side-menu-button.component';
import {HomeButtonComponent} from './home-button/home-button.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TopBarPanelComponent} from './top-bar-panel/top-bar-panel.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-bar',
  template: `
<div class="container">
  @if (getPermission() | async; as permission) {
    <div class="left">
      @if (permission.isPermited) {
        <app-side-menu-button/>
      }
      @if (permission.isPermited) {
        <app-home-button class="home-button"/>
      }
    </div>
    <div class="center">
      @if (permission.isPermited) {
        <!-- <app-title/> -->
        <app-top-menu/>
      }
    </div>
    <div class="right">
      <app-top-bar-panel/>
    </div>
  }
</div>
<div class="subline"></div>

`,
  styleUrl: './top-bar.component.css',
  imports: [SideMenuButtonComponent, HomeButtonComponent, TopMenuComponent, TopBarPanelComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
