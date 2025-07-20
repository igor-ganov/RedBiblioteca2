import {ActivatedRouteSnapshot, DefaultExport, Route, Router, Routes} from '@angular/router';
import {inject, Type} from '@angular/core';
import {LocaleHost} from '../lang-system/LocaleHost';
import {UserRoles} from '../permission-system/UserRoles';
import {PermissionService} from '@common/permission-system/UserService';
import {map, Observable} from 'rxjs';
import {TextDictionaryService} from "@common/lang-system/TextDictionaryService";
import {TextDictionary} from "@common/lang-system/TextDictionary";

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
  newspapersContent: 'newspapers-content',
  articlesContent: 'articles-content',
  bannerContent: 'banner-content'
}

export const authRoleGuard = (role: UserRoles = UserRoles.GUEST) => (route: ActivatedRouteSnapshot) => {
  const userService = inject(PermissionService);
  const router = inject(Router);
  return userService.isPermit(role).pipe(map(permission => permission.isPermited ? true : router.createUrlTree([`/${route.parent!.url.join('/')}`])));
}

export interface RouteContext {
  requiredRole: UserRoles | undefined;
}

export interface RouteHeader {
  title: (value: TextDictionary) => string;
  icon: string;
}

export interface RouteData {
  requiredRole: UserRoles | undefined;
  isMenuItem: boolean | undefined;
  header?: RouteHeader;
}

export interface RouteContextDependency {
  localeHost: LocaleHost;
  textDictionaryService: TextDictionaryService;
}

function createRouteData(header?: RouteHeader, requiredRole?: UserRoles, isMenuItem?: boolean): RouteData {
  return {
    requiredRole: requiredRole,
    isMenuItem: isMenuItem,
    header: header
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
    data: createRouteData(item.header, item.userRole, item.isMenuItem),
    children: [{loadComponent: item.loadComponent, path: ''}, ...item.children.map(c => createRoute(c)), redirectRoute],
    canDeactivate: item.checkIfSaved ? [(component: IFormContent) => {
      console.log(component);
      return !(component.isEditing?.() ?? false) || confirm('You have unsaved changes. Do you want to drop them?');
    }] : undefined
    // canActivate: [authRoleGuard(item.userRole)],
  } : {
    loadComponent: item.loadComponent,
    path: item.path,
    resolve: createContext(item.userRole),
    data: createRouteData(item.header, item.userRole, item.isMenuItem),
    canDeactivate: item.checkIfSaved ? [(component: IFormContent) => {
      console.log(component);
      return !(component.isEditing?.() ?? false) || confirm('You have unsaved changes. Do you want to drop them?');
    }] : undefined
    // canActivate: [authRoleGuard(item.userRole)],
  }
}

export interface RouteItem {
  header: RouteHeader;
  loadComponent?: () => Type<unknown> | Observable<Type<unknown> | DefaultExport<Type<unknown>>> | Promise<Type<unknown> | DefaultExport<Type<unknown>>>;
  path?: string | undefined;
  userRole?: UserRoles | undefined;
  children?: RouteItem[] | undefined;
  isMenuItem?: boolean;
  checkIfSaved?: boolean;
}

export interface IFormContent {
  isEditing(): boolean;
}

export const routes = createRoutes([
  {
    loadComponent: () => import('@app/features/home/home.component').then(m => m.HomeComponent),
    path: routsPaths.home,
    isMenuItem: true,
    header: {
      title: d => d.home,
      icon: 'home'
    }
  },
  {
    loadComponent: () => import('@app/features/test/test.component').then(m => m.TestComponent),
    path: routsPaths.test,
    userRole: UserRoles.DEVELOPER,
    header: {
      title: d => d.home,
      icon: 'home'
    }
  },
  {
    path: routsPaths.newspapers,
    loadComponent: () => import('@app/features/newspapers/newspapers.component').then(m => m.NewspapersComponent),
    isMenuItem: true,
    header: {
      title: d => d.newspapers,
      icon: 'Newspapers'
    },
    children: [
      {
        loadComponent: () => import('@app/features/newspapers/new-newspaper/new-newspaper.component').then(m => m.NewNewspaperComponent),
        path: 'new',
        header: {
          title: d => d.newnewspaper,
          icon: 'Newspaper'
        }
      },
      {
        loadComponent: () => import('@app/features/newspapers/newspapers/newspaper.component').then(m => m.NewspaperComponent),
        path: ':newspaperId',
        header: {
          title: d => d.newspaper,
          icon: 'Newspaper'
        }
      }
    ],
  },
  {
    path: routsPaths.books,
    loadComponent: () => import('@app/features/books/books.component').then(m => m.BooksComponent),
    isMenuItem: true,
    header: {
      title: d => d.books,
      icon: 'Books'
    },
    children: [
      {
        loadComponent: () => import('@app/features/books/new-book/new-book.component').then(m => m.NewBookComponent),
        path: 'new',
        header: {
          title: d => d.newbook,
          icon: 'NewBook'
        }
      },
      {
        loadComponent: () => import('@app/features/books/book/book.component').then(m => m.BookComponent),
        path: ':bookId',
        header: {
          title: d => d.book,
          icon: 'Book'
        }
      }
    ],

  },
  {
    path: routsPaths.admin,
    loadComponent: () => import('@app/features/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
    userRole: UserRoles.DEVELOPER,
    isMenuItem: true,
    header: {
      title: d => d.admin,
      icon: 'Admin'
    },
    children: [
      {
        loadComponent: () => import('@app/features/admin-panel/firebase-panel/firebase-panel.component').then(m => m.FirebasePanelComponent),
        path: routsPaths.firebase,
        header: {
          title: d => d.firebasePanel,
          icon: 'FirebasePanel'
        }
      },
      {
        loadComponent: () => import('@app/features/admin-panel/content-manager/content-manager.component').then(m => m.ContentManagerComponent),
        path: routsPaths.contentManager,
        header: {
          title: d => d.contentManager,
          icon: 'ContentManager'
        },
        children: [
          {
            loadComponent: () => import('@app/features/admin-panel/content-manager/newspapers-content/newspapers-content.component').then(m => m.NewspapersContentComponent),
            path: routsPaths.newspapersContent,
            header: {
              title: d => d.newspapersContent,
              icon: 'newspapers'
            },
            children: [
              {
                loadComponent: () => import('@app/features/admin-panel/content-manager/newspapers-content/newspaper-content/newspaper-content.component').then(m => m.NewspaperContentComponent),
                path: ':pid',
                header: {
                  title: d => d.newspapersContent,
                  icon: 'newspapers'
                },
                checkIfSaved: true,
              }
            ]
          },
          {
            loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/home-content.component').then(m => m.HomeContentComponent),
            path: routsPaths.homeContent,
            header: {
              title: d => d.homeContent,
              icon: 'home'
            },
            children: [
              {
                loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/articles-content/articles-content.component').then(m => m.ArticlesContentComponent),
                path: routsPaths.articlesContent,
                header: {
                  title: d => d.articlesContent,
                  icon: 'ArticlesContent'
                },
                children: [
                  {
                    loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/articles-content/article-content/article-content.component').then(m => m.ArticleContentComponent),
                    path: ':pid',
                    header: {
                      title: d => d.articleContent,
                      icon: 'ArticleContent'
                    },
                    checkIfSaved: true,
                  }
                ]
              },
              {
                loadComponent: () => import('@app/features/admin-panel/content-manager/home-content/banner-content/banner-content.component').then(m => m.BannerContentComponent),
                path: routsPaths.bannerContent,
                header: {
                  title: d => d.bannerContent,
                  icon: 'BannerContent'
                },
                checkIfSaved: true,
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
    header: {
      title: d => d.login,
      icon: 'Login'
    }
  },
  {
    loadComponent: () => import('@app/features/about/about.component').then(m => m.AboutComponent),
    path: routsPaths.about,
    isMenuItem: true,
    header: {
      title: d => d.about,
      icon: 'About'
    }
  },
]);
