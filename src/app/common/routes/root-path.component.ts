import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import {LocaleHost} from '../lang-system/LocaleHost';
import {RootHrefService} from './RootHrefService';
import {PermissionService} from "@common/permission-system/UserService";
import { LoginComponent } from '../../features/login/login.component';
import { AsyncPipe } from '@angular/common';

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
  `,
    imports: [RouterOutlet, LoginComponent, AsyncPipe]
})
export class RootPathComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: LocaleHost,
    private rootPathService: RootHrefService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const lang = params['lang'];
      this.translateService.setLanguage(lang);
      this.rootPathService.setBaseRoot(lang)
    });
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}
