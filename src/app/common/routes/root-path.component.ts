import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LocaleHost} from '../lang-system/LocaleHost';
import {RootHrefService} from './RootHrefService';
import {PermissionService} from "@common/permission-system/UserService";
import {AsyncPipe} from '@angular/common';

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
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootPathComponent implements OnInit {
  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly translateService: LocaleHost,
    private readonly rootPathService: RootHrefService
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const lang = params['lang'];
      this.translateService.setLanguage(lang);
      this.rootPathService.setBaseRoot(lang)
    });
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public readonly getPermission = () => this.permissionService.blockUntilDeveloping();
}
