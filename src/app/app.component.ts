import {Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [TopBarComponent, SideMenuComponent, MainComponent, FooterComponent, AsyncPipe]
})
export class AppComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
