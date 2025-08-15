import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Initialize Firebase
const firebaseApp = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(firebaseApp);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      // Firebase providers will be available application-wide
    ])
  ]
};
