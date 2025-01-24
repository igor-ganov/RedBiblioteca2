import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { DatePipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BrowserModule, CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, RouterOutlet, NgOptimizedImage),
        DatePipe,
        provideHttpClient(withFetch()),
        // provideRouter(rootRoute),
        provideClientHydration(),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
