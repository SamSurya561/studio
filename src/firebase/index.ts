'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { FirebaseProvider, useFirebaseApp, useAuth, useFirestore } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';

// Provides a properly initialized Firebase app instance
function initializeFirebase(): { app: FirebaseApp; auth: Auth; firestore: Firestore } {
  const apps = getApps();
  const app = apps.length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export { 
    initializeFirebase,
    FirebaseProvider,
    FirebaseClientProvider,
    useFirebaseApp,
    useAuth,
    useFirestore,
    useCollection,
};
