import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from '../../features/home/home.component';
import { LoginComponent } from '../../features/login/login.component';
import { TestComponent } from '../../features/test/test.component';
import { BooksComponent } from '../../features/books/books.component';
import { NewBookComponent } from '../../features/books/new-book/new-book.component';
import { AboutComponent } from '../../feature/about/about.component';
import { EventsComponent } from '../../feature/events/events.component';
import { NewEventComponent } from '../../feature/events/new-event/new-event.component';
import { EventComponent } from '../../feature/events/event/event.component';
import { NewNewspaperComponent } from '../../features/newspapers/new-newspaper/new-newspaper.component';
import { NewspapersComponent } from '../../features/newspapers/newspapers.component';
import { NewspaperComponent } from '../../features/newspapers/newspapers/newspaper.component';
import { AdminPanelComponent } from '../../features/admin-panel/admin-panel.component';
import { FirebasePanelComponent } from '../../features/admin-panel/firebase-panel/firebase-panel.component';
import { Type, inject } from '@angular/core';
import { LocaleHost } from '../lang-system/LocaleHost';
import { TextDictionaryServcie } from '../lang-system/TextDictionaryService';
import { UserRoles } from '../permission-system/UserRoles';
import { BookComponent } from '@app/features/books/book/book.component';
import { PermissionService, UserService } from '@common/permission-system/UserService';
import { map } from 'rxjs';

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
}

export const authRoleGuard = (role: UserRoles = UserRoles.GUEST) => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(PermissionService);
    const router = inject(Router);
    return userService.isPermit(role).pipe(map(permission => permission.isPermited ? true : router.createUrlTree([`/${route.parent!.url.join('/')}`])));
}

export interface RouteContext{
    requiredRole: UserRoles | undefined;
}
export interface RouteData{
    requiredRole: UserRoles | undefined;
    isMenuItem: boolean | undefined;
}
export interface RouteContextDependency{
    localeHost: LocaleHost;
    textDictionaryServcie: TextDictionaryServcie;
}
function createRouteData(requiredRole?: UserRoles, isMenuItem?: boolean) : RouteData{
    return {
        requiredRole: requiredRole,
        isMenuItem: isMenuItem,
    }
}
function createContext<T>(requiredRole?: UserRoles) : {context: () => RouteContext} {

    return {
        context: () => {
            const dependency : RouteContextDependency = {
                localeHost: inject(LocaleHost),
                textDictionaryServcie: inject(TextDictionaryServcie),
            }
            // return context(dependency)
            return {
                requiredRole: requiredRole
            };
        }
    };
}

export const bugComponents = {
    newBook: NewBookComponent,
}

const redirectRoute : Route = { path: '**', redirectTo: '', pathMatch: 'full' };

function createRoutes(items: RouteItem[]): Routes{
    return [...items.map(i => createRoute(i)), redirectRoute];
}
function createRoute(item: RouteItem): Route{

    return item.children && item.children.length > 0 ? {
        path: item.path,
        resolve: createContext(item.userRole),
        data: createRouteData(item.userRole, item.isMenuItem),
        children: [{component: item.component, path: ''}, ...item.children?.map(c => createRoute(c)), redirectRoute],
        canActivate: [authRoleGuard(item.userRole)],
    } : {
        component: item.component,
        path: item.path,
        resolve: createContext(item.userRole),
        data: createRouteData(item.userRole, item.isMenuItem),
        canActivate: [authRoleGuard(item.userRole)],
    }
}

export interface RouteItem {
    component?: Type<any> | undefined;
    path?: string | undefined;
    userRole?: UserRoles | undefined;
    children?: RouteItem[] | undefined;
    isMenuItem?: boolean;
}
export const routes = createRoutes([
    { component: HomeComponent, path: routsPaths.home, isMenuItem: true },
    { component: TestComponent, path: routsPaths.test, userRole: UserRoles.DEVELOPER },
    {
        path: routsPaths.newspapers,
        component: NewspapersComponent,
        isMenuItem: true,
        children: [
            {component: NewNewspaperComponent, path: 'new'},
            {component: NewspaperComponent, path: ':newspaperId'}
        ],

     },
    {
        path: routsPaths.events,
        component: EventsComponent,
        isMenuItem: true,
        children: [
            {component: NewEventComponent, path: 'new'},
            {component: EventComponent, path: ':eventId'}
        ],

    },
    {
        path: routsPaths.books,
        component: BooksComponent,
        isMenuItem: true,
        children: [
            {component: bugComponents.newBook, path: 'new'},
            {component: BookComponent, path: ':bookId'}
        ],

    },
     {
        path: routsPaths.admin,
        component: AdminPanelComponent,
        userRole: UserRoles.DEVELOPER,
        isMenuItem: true,
        children: [
            {component: FirebasePanelComponent, path: routsPaths.firebase}
        ],
     },
    { component: LoginComponent, path: routsPaths.login, userRole: UserRoles.GUEST},
    { component: AboutComponent, path: routsPaths.about, isMenuItem: true },

]);
