import { Routes, UrlSegment } from '@angular/router';
import { checkLang } from '../lang-system/checkLang';
import { TextHost } from '../lang-system/TextHost';
import { RootPathComponent } from './root-path.component';
import { routes } from './routes';

export const rootRoute: Routes = [
    {
        matcher: checkLang,
        component: RootPathComponent,
        children: routes,
        // canActivateChild: [canActivateChild]
    },
    { path: '**', redirectTo: `${TextHost.DefaultLanguage}`, pathMatch: 'full' },
]

