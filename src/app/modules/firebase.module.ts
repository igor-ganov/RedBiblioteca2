import { NgModule, importProvidersFrom } from '@angular/core';


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
