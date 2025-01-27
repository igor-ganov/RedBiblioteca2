import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {SideMenuButtonComponent} from '../side-menu/side-menu-button/side-menu-button.component';
import {HomeButtonComponent} from './home-button/home-button.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TopBarPanelComponent} from './top-bar-panel/top-bar-panel.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  imports: [SideMenuButtonComponent, HomeButtonComponent, TopMenuComponent, TopBarPanelComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
