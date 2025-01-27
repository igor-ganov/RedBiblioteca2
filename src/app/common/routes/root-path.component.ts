import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterOutlet} from '@angular/router';
import {LocaleHost} from '../lang-system/LocaleHost';
import {RootHrefService} from './RootHrefService';
import {PermissionService} from "@common/permission-system/UserService";
import {AsyncPipe} from '@angular/common';
import {LoginComponent} from "@app/features/login/login.component";
import {LoadingComponent} from "@common/components/loading/loading.component";

@Component({
  selector: 'root-path',
  template: `
    @if (getPermission() | async; as permission) {
      @if (permission.isPermited) {
        <router-outlet/>
      } @else {
        <app-login/>
      }
    } @else {
      <app-loading/>
    }
  `,
  imports: [AsyncPipe, LoginComponent, RouterOutlet, LoadingComponent],
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
  public readonly permissionsIsLoading = computed(() => this.permissionService.isLoading());
  public readonly getPermission = () => this.permissionService.blockUntilDeveloping();
}
