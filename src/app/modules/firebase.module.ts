import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore, FirestoreModule } from '@angular/fire/firestore';

const depends =[

  // provideFirebaseApp(() => initializeApp(environment.firebase)),
  // provideAuth(() => getAuth()),
  // provideFirebaseApp(() => initializeApp(environment.firebase)),
  // AngularFireModule.initializeApp(environment.firebase),
  // provideAuth(() => getAuth()),
  // AngularFireAuthModule,
  // FirestoreModule,
  // provideFirestore(() => getFirestore()),
];
@NgModule({
  providers: [
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
  ],
})
export class FirebaseModule { }
