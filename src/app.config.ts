import {importProvidersFrom, provideExperimentalZonelessChangeDetection} from "@angular/core";
import {AppRoutingModule} from "@app/modules/app-routing.module";
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration
} from "@angular/platform-browser";
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterOutlet} from "@angular/router";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(AppRoutingModule, BrowserModule, CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, RouterOutlet, NgOptimizedImage),
    DatePipe,
    provideHttpClient(withFetch()),
    /*provideRouter(rootRoute, withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withViewTransitions(),
      withComponentInputBinding(),
    ),*/
    provideAnimations(),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ]
}

