import {Component, inject} from '@angular/core';
import {ThemeSwitcher} from '@common/theming/services/ThemeSwitcher';
import {PermissionService} from '@common/permission-system/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly themeSwitcher: ThemeSwitcher) {
    //to fix lazy build additional css for routes in ssr
    themeSwitcher.isDark = false;
    themeSwitcher.isDark = true;
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
