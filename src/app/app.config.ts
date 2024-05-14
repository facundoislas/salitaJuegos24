import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos24-6ac32","appId":"1:60143487617:web:98b3029e78fb77660adb80","storageBucket":"saladejuegos24-6ac32.appspot.com","apiKey":"AIzaSyDjDdF6Z_Z9vUMJpeR2PDp2YRY2eUVfSg4","authDomain":"saladejuegos24-6ac32.firebaseapp.com","messagingSenderId":"60143487617"}))), importProvidersFrom(provideAuth(() => getAuth())),importProvidersFrom(HttpClientModule), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
