import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { rootRoute } from './common/routes/root-route';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), provideRouter(rootRoute), provideClientHydration(), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"wemonpftest","appId":"1:665346737260:web:cdced5bb9407f0d6bec449","storageBucket":"wemonpftest.appspot.com","apiKey":"AIzaSyCJQVXmzPT7XO3_unt6UDd_yBFO9EX-i2o","authDomain":"wemonpftest.firebaseapp.com","messagingSenderId":"665346737260","measurementId":"G-3GBBZDJ7RM"})), provideAuth(() => getAuth()), provideFunctions(() => getFunctions())]
  // providers: [provideHttpClient(withFetch()), provideClientHydration(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"wemonpftest","appId":"1:665346737260:web:cdced5bb9407f0d6bec449","storageBucket":"wemonpftest.appspot.com","apiKey":"AIzaSyCJQVXmzPT7XO3_unt6UDd_yBFO9EX-i2o","authDomain":"wemonpftest.firebaseapp.com","messagingSenderId":"665346737260","measurementId":"G-3GBBZDJ7RM"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFunctions(() => getFunctions()))]
};
