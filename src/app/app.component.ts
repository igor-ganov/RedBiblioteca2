import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {TopBarComponent} from './layout/top-bar/top-bar.component';
import {SideMenuComponent} from './layout/side-menu/side-menu.component';
import {MainComponent} from './layout/main/main.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AsyncPipe} from '@angular/common';
import {RouteBarComponent} from "@app/layout/route-bar/route-bar.component";

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
      <app-route-bar class="route-bar"/>
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
  styles: `
    :host {
      --header-offset: 4em;
    }

    .layout {
      display: grid;
      width: 100%;
      height: fit-content;
      min-height: 100%;
      grid-template:
      "head head" var(--header-offset)
      "bar  bar" fit-content(0)
      "nav  main" 1fr
      "nav  foot" fit-content(3em)
      / fit-content(10%) 1fr;
    }

    .header {
      position: sticky;
      top: 0;
      z-index: 1000;

      /* background-color: var(--theme-color-hieght); */
      background-color: var(--primary-default);
      grid-area: head;
    }

    .route-bar {
      position: sticky;
      grid-area: bar;
    }

    .side-menu {
      grid-area: nav;
    }

    .main-body {
      grid-area: main;
    }

    .footer {
      grid-area: foot;
    }
  `,
  imports: [TopBarComponent, SideMenuComponent, MainComponent, FooterComponent, AsyncPipe, RouteBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public readonly getPermission = () => this.permissionService.blockUntilDeveloping();
}
