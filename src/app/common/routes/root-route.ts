import {Routes} from '@angular/router';
import {TextHost} from '../lang-system/TextHost';
import {RootPathComponent} from './root-path.component';
import {canActivateLang} from "@common/lang-system/canActivateLang";
import {routes} from "@common/routes/routes";

export const rootRoute: Routes = [
  {
    // matcher: checkLang,
    path: ':lang',
    component: RootPathComponent,
    children: routes,
    canActivate: [canActivateLang],
    // canActivateChild: [canActivateChild]
  },
  {path: '**', redirectTo: `${TextHost.DefaultLanguage}`, pathMatch: 'full'},
]

