import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),
        // Provide each Firebase service directly
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => {
            const firestore = getFirestore();
            if (isDevMode()) {
                enableIndexedDbPersistence(firestore).catch((err) => {
                    if (err.code === 'failed-precondition') {
                        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
                    } else if (err.code === 'unimplemented') {
                        console.warn('The current browser does not support all of the features required to enable persistence');
                    }
                });
            }
            return firestore;
        }),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage())
    ]
};