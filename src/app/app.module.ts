import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirestoreModule, provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterModule, provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { LanguageButtonComponent } from './common/lang-system/language-button/language-button.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { MaterialModule } from './modules/material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { rootRoute } from './common/routes/root-route';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { TestComponent } from './features/test/test.component';
import { RootPathComponent } from './common/routes/root-path.component';
import { TopBarPanelComponent } from './layout/top-bar/top-bar-panel/top-bar-panel.component';
import { ThemeSwitcherComponent } from './common/theming/theme-switcher/theme-switcher.component';
import { SignIoButtonComponent } from './common/permission-system/sign-io-button/sign-io-button.component';
import { SideMenuButtonComponent } from './layout/side-menu/side-menu-button/side-menu-button.component';
import { HomeButtonComponent } from './layout/top-bar/home-button/home-button.component';
import { TitleComponent } from './layout/top-bar/title/title.component';
import { BooksComponent } from './features/books/books.component';
import { TruncatePipe } from './common/help/pipelines/TruncatePipe';
import { Base64ToImage, Base64ToStyle } from './common/help/pipelines/Base64ToImage';
import { BookComponent } from './features/books/book/book.component';
import { BookPreviewComponent } from './features/books/book-preview/book-preview.component';
import { BookViewComponent } from './features/books/book-view/book-view.component';
import { TextEditorComponent } from './common/components/text-editor/text-editor.component';
import { ImageEditorComponent } from './common/components/image-editor/image-editor.component';
import { NewBookComponent } from './features/books/new-book/new-book.component';
import { LoadingComponent } from './common/components/loading/loading.component';
import { SliderComponent } from './common/components/slider/slider.component';
import { TopBarPanelButtonComponent } from './layout/top-bar/top-bar-panel/top-bar-panel-button/top-bar-panel-button.component';
import { EventsComponent } from './feature/events/events.component';
import { AboutComponent } from './feature/about/about.component';
import { EventComponent } from './feature/events/event/event.component';
import { NewEventComponent } from './feature/events/new-event/new-event.component';
import { ListComponent } from './common/components/content/list/list.component';
import { PageComponent } from './common/components/content/page/page.component';
import { NewPageComponent } from './common/components/content/new-page/new-page.component';
import { NewNewspaperComponent } from './features/newspapers/new-newspaper/new-newspaper.component';
import { NewspapersComponent } from './features/newspapers/newspapers.component';
import { NewspaperComponent } from './features/newspapers/newspapers/newspaper.component';
import { NewspaperPreviewComponent } from './features/newspapers/newspaper-preview/newspaper-preview.component';
import { NewspaperViewComponent } from './features/newspapers/newspaper-view/newspaper-view.component';
import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { FirebasePanelComponent } from './features/admin-panel/firebase-panel/firebase-panel.component';
import { UsersPanelComponent } from './features/admin-panel/users-panel/users-panel.component';
import { NotFoundComponent } from './common/components/errors/not-found/not-found.component';
import { CardComponent } from './common/components/errors/card/card.component';
import { ErrorsComponent } from './common/components/errors/errors/errors.component';
import { LastNewsComponent } from './features/home/last-news/last-news.component';
import { AnchorComponent } from './common/components/anchor/anchor.component';
import { ScrollToDirective } from './common/components/scroll-to.directive';
import { SlideShowComponent } from './common/components/slide-show/slide-show.component';
import { IfSuccess } from './common/components/errors/if-success.directive';
import { TopBannerComponent } from './features/home/top-banner/top-banner.component';
import { ArticleComponent } from './features/home/article/article.component';
import { TopMenuComponent } from './layout/top-bar/top-menu/top-menu.component';

@NgModule({
  declarations: [
    Base64ToImage,
    Base64ToStyle,
    TruncatePipe,
    AppComponent,
    TopBarComponent,
    SideMenuComponent,
    FooterComponent,
    MainComponent,
    LanguageButtonComponent,
    LoginComponent,
    HomeComponent,
    TestComponent,
    RootPathComponent,
    TopBarPanelComponent,
    ThemeSwitcherComponent,
    SignIoButtonComponent,
    SideMenuButtonComponent,
    HomeButtonComponent,
    TitleComponent,
    BookComponent,
    BooksComponent,
    BookPreviewComponent,
    BookViewComponent,
    TextEditorComponent,
    ImageEditorComponent,
    NewBookComponent,
    LoadingComponent,
    SliderComponent,
    TopBarPanelButtonComponent,
    NewspapersComponent,
    NewNewspaperComponent,
    NewspaperComponent,
    NewspaperPreviewComponent,
    NewspaperViewComponent,
    EventsComponent,
    AboutComponent,
    EventComponent,
    NewEventComponent,
    ListComponent,
    PageComponent,
    NewPageComponent,
    AdminPanelComponent,
    FirebasePanelComponent,
    UsersPanelComponent,
    NotFoundComponent,
    CardComponent,
    ErrorsComponent,
    LastNewsComponent,
    AnchorComponent,
    ScrollToDirective,
    SlideShowComponent,
    IfSuccess,
    TopBannerComponent,
    ArticleComponent,
    TopMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    CommonModule,
    FirestoreModule,
    FormsModule,
    MaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  providers: [
    DatePipe,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withFetch()),
    // provideRouter(rootRoute),
    provideClientHydration(),
    provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
