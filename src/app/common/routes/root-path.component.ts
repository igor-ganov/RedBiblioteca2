import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router, RouterModule } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { LocaleHost } from '../lang-system/LocaleHost';
import { RootHrefService } from './RootHrefService';
import { PermissionService } from '@common/permission-system/UserService';
import { UserRoles } from '@common/permission-system/UserRoles';

@Component({
    selector: 'root-path',
    template: `
      @if (getPermission() | async; as permission) {
        @if (permission.isPermited) {
          <router-outlet></router-outlet>
        } @else {
          <app-login/>
        }
      }
      `
})
export class RootPathComponent implements OnInit {

  subs: Array<Subscription> = [];

  constructor(
    private activatedRoute : ActivatedRoute,
    private translateService: LocaleHost,
    private rootPathService: RootHrefService
    ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params : Params) => {
      const lang = params['lang'];
      this.translateService.setLanguage(lang);
      this.rootPathService.setBaseRoot(lang)
    });
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
