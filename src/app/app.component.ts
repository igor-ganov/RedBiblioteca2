import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { LayoutModule } from './modules/layout.module';
import { ThemeSwitcher } from './common/theming/services/ThemeSwitcher';
import { MaterialModule } from './modules/material.module';
import { UserRoles } from '@common/permission-system/UserRoles';
import { PermissionService } from '@common/permission-system/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly themeSwitcher: ThemeSwitcher){
    //to fix lazy build additional css for routes in ssr 
    themeSwitcher.isDark = true;
    themeSwitcher.isDark = false;
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
