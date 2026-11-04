import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { reactive } from 'vue';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const allowedEmail = (
  import.meta.env.VITE_ALLOWED_GOOGLE_EMAIL || 'ramshettypavan@gmail.com'
).trim().toLowerCase();

export const firebaseConfigError = Object.entries({
  VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
  VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  VITE_FIREBASE_APP_ID: firebaseConfig.appId
}).filter(([, value]) => !value).map(([key]) => key);

export const authState = reactive({
  initialized: false,
  loading: false,
  user: null,
  error: ''
});

let auth = null;

if (!firebaseConfigError.length) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Firebase persistence setup failed:', error);
    authState.error = 'Unable to restore your login session.';
  });
}

export const authReady = new Promise((resolve) => {
  if (!auth) {
    authState.initialized = true;
    resolve(null);
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user && isAuthorizedUser(user)) {
      authState.user = user;
    } else {
      authState.user = null;
      if (user) {
        signOut(auth).catch((error) => {
          console.error('Failed to sign out unauthorized account:', error);
        });
      }
    }
    authState.initialized = true;
    resolve(authState.initialized ? auth : null);
  });
});

export function isAuthorizedUser(user) {
  return Boolean(user?.email && user.email.trim().toLowerCase() === allowedEmail);
}

export async function loginWithGoogle() {
  authState.error = '';

  if (!auth) {
    authState.error = 'Firebase is not configured. Add the Vite Firebase environment variables.';
    return;
  }

  authState.loading = true;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(auth, provider);
    if (!isAuthorizedUser(result.user)) {
      await signOut(auth);
      authState.user = null;
      return { authorized: false };
    }
    authState.user = result.user;
    return { authorized: true };
  } catch (error) {
    if (error?.code === 'auth/configuration-not-found') {
      authState.error = 'Google sign-in is not configured in Firebase. Enable the Google provider in Firebase Console > Authentication > Sign-in method.';
    } else if (error?.code === 'auth/unauthorized-domain') {
      authState.error = 'This domain is not authorized. Add localhost and your Cloudflare Pages domain in Firebase Authentication settings.';
    } else if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
      authState.error = 'Google sign-in was cancelled. Please try again.';
    } else if (error?.code === 'auth/popup-blocked') {
      authState.error = 'Your browser blocked the Google sign-in popup. Allow popups and try again.';
    } else {
      authState.error = error?.message || 'Google sign-in failed. Please try again.';
    }
    return { authorized: false };
  } finally {
    authState.loading = false;
  }
}

export async function logout() {
  authState.error = '';
  if (!auth) return;
  authState.loading = true;
  try {
    await signOut(auth);
    authState.user = null;
  } finally {
    authState.loading = false;
  }
}
