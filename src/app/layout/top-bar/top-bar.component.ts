import { Component, inject } from '@angular/core';
import { LocaleHost } from '../../common/lang-system/LocaleHost';
import { Observable } from 'rxjs';
import { UserRoles } from '@common/permission-system/UserRoles';
import { PermissionService } from '@common/permission-system/UserService';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  private readonly localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;

  ngOnInit(): void {
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();
    })
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.blockUntilDeveloping();
}