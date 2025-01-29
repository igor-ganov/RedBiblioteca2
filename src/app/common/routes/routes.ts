import {ActivatedRouteSnapshot, DefaultExport, Route, Router, Routes} from '@angular/router';
import {inject, Type} from '@angular/core';
import {LocaleHost} from '../lang-system/LocaleHost';
import {UserRoles} from '../permission-system/UserRoles';
import {PermissionService} from '@common/permission-system/UserService';
import {map, Observable} from 'rxjs';
import {TextDictionaryService} from "@common/lang-system/TextDictionaryService";
import {TKeyOfFactory} from "@common/lang-system/TextHost";
import {ITitleFactory} from "@common/menu-system/IHasTitle";

export const rootPath = '/'

export const routsPaths = {
  home: '',
  login: 'login',
  test: 'test',
  books: 'books',
  newspapers: 'newspapers',
  about: 'about',
  events: 'events',
  admin: 'admin',
  firebase: 'firebase',
  contentManager: 'content-manager',
  homeContent: 'home-content',
  articlesContent: 'articles-content',


}

export const authRoleGuard = (role: UserRoles = UserRoles.GUEST) => (route: ActivatedRouteSnapshot) => {
  const userService = inject(PermissionService);
  const router = inject(Router);
  return userService.isPermit(role).pipe(map(permission => permission.isPermited ? true : router.createUrlTree([`/${route.parent!.url.join('/')}`])));
}

export interface RouteContext {
  requiredRole: UserRoles | undefined;
}

export interface RouteData {
  requiredRole: UserRoles | undefined;
  isMenuItem: boolean | undefined;
  textTag: TKeyOfFactory<ITitleFactory>;
}

export interface RouteContextDependency {
  localeHost: LocaleHost;
  textDictionaryService: TextDictionaryService;
}

function createRouteData<K extends TKeyOfFactory<ITitleFactory>>(textKey: K, requiredRole?: UserRoles, isMenuItem?: boolean): RouteData {
  return {
    requiredRole: requiredRole,
    isMenuItem: isMenuItem,
    textTag: textKey,
  }
}

function createContext(requiredRole?: UserRoles): { context: () => RouteContext } {

  return {
    context: () => ({
      requiredRole: requiredRole
    })
  };
}

const redirectRoute: Route = {path: '**', redirectTo: '', pathMatch: 'full'};

function createRoutes(items: RouteItem[]): Routes {
  return [...items.map(i => createRoute(i)), redirectRoute];
}

function createRoute(item: RouteItem): Route {

  return item.children && item.children.length > 0 ? {
    path: item.path,
    resolve: createContext(item.userRole),
    data: createRouteData(item.textKey, item.userRole, item.isMenuItem),
    children: [{loadComponent: item.loadComponent, path: ''}, ...item.children.map(c => createRoute(c)), redirectRoute],
    // canActivate: [authRoleGuard(item.userRole)],
  } : {
    loadComponent: item.loadComponent,
    path: item.path,
    resolve: createContext(item.userRole),
    data: createRouteData(item.textKey, item.userRole, item.isMenuItem),
    // canActivate: [authRoleGuard(item.userRole)],
  }
}

export interface RouteItem {
  textKey: TKeyOfFactory<ITitleFactory>;
  loadComponent?: () => Type<unknown> | Observable<Type<unknown> | DefaultExport<Type<unknown>>> | Promise<Type<unknown> | DefaultExport<Type<unknown>>>;
  path?: string | undefined;
  userRole?: UserRoles | undefined;
  children?: RouteItem[] | undefined;
  isMenuItem?: boolean;
}

export const routes = createRoutes([
  {
    loadComponent: () => import('@app/features/home/home.component').then(m => m.HomeComponent),
    path: routsPaths.home,
    isMenuItem: true,
    textKey: 'home'
  },
  {
    loadComponent: () => import('@app/features/test/test.component').then(m => m.TestComponent),
    path: routsPaths.test,
    userRole: UserRoles.DEVELOPER,
    textKey: 'home'
  },
  {
    path: routsPaths.newspapers,
    loadComponent: () => import('@app/features/newspapers/newspapers.component').then(m => m.NewspapersComponent),
    isMenuItem: true,
    textKey: 'newspapers',
    children: [
      {
        loadComponent: () => import('@app/features/newspapers/new-newspaper/new-newspaper.component').then(m => m.NewNewspaperComponent),
        path: 'new',
        textKey: 'newNewspaper'
      },
      {
        loadComponent: () => import('@app/features/newspapers/newspapers/newspaper.component').then(m => m.NewspaperComponent),
        path: ':newspaperId',
        textKey: 'newspaper'
      }
    ],
  },
  {
    path: routsPaths.books,
    loadComponent: () => import('@app/features/books/books.component').then(m => m.BooksComponent),
    isMenuItem: true,
    textKey: 'books',
    children: [
      {
        loadComponent: () => import('@app/features/books/new-book/new-book.component').then(m => m.NewBookComponent),
        path: 'new',
        textKey: 'newBook'
      },
      {
        loadComponent: () => import('@app/features/books/book/book.component').then(m => m.BookComponent),
        path: ':bookId',
        textKey: 'book'
      }
    ],

  },
  {
    path: routsPaths.admin,
    loadComponent: () => import('@app/features/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
    userRole: UserRoles.DEVELOPER,
    isMenuItem: true,
    textKey: 'adminPanel',
    children: [
      {
        loadComponent: () => import('@app/features/admin-panel/firebase-panel/firebase-panel.component').then(m => m.FirebasePanelComponent),
        path: routsPaths.firebase,
        textKey: 'firebasePanel'
      },
      {
        loadComponent: () => import('@app/features/admin-panel/content-manager/content-manager.component').then(m => m.ContentManagerComponent),
        path: routsPaths.contentManager,
        textKey: 'contentManager',
        children: [
          {
            loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/home-content.component').then(m => m.HomeContentComponent),
            path: routsPaths.homeContent,
            textKey: 'homeContent',
            children: [
              {
                loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/articles-content/articles-content.component').then(m => m.ArticlesContentComponent),
                path: routsPaths.articlesContent,
                textKey: 'articlesContent',
              }
            ]
          },
        ]
      }
    ],
  },
  {
    loadComponent: () => import('@app/features/login/login.component').then(m => m.LoginComponent),
    path: routsPaths.login,
    userRole: UserRoles.GUEST,
    textKey: 'login'
  },
  {
    loadComponent: () => import('@app/features/about/about.component').then(m => m.AboutComponent),
    path: routsPaths.about,
    isMenuItem: true,
    textKey: 'about'
  },

]);
