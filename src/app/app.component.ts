import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {TopBarComponent} from './layout/top-bar/top-bar.component';
import {SideMenuComponent} from './layout/side-menu/side-menu.component';
import {MainComponent} from './layout/main/main.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
@let permission = getPermission() | async;
<section class="layout">
  <header class="header">
    <app-top-bar/>
  </header>
  @if (permission?.isPermited) {
    <nav class="side-menu">
      <app-side-menu/>
    </nav>
  }
  <main class="main-body">
    <app-main/>
  </main>
  @if (permission?.isPermited) {
    <footer class="footer">
      <app-footer/>
    </footer>
  }
</section>

`,
  styleUrl: './app.component.css',
  imports: [TopBarComponent, SideMenuComponent, MainComponent, FooterComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public readonly getPermission = () => this.permissionService.blockUntilDeveloping();
}
