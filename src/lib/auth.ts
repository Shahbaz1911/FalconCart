'use client';

import { auth } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAdditionalUserInfo,
  type User,
} from 'firebase/auth';
import { sendWelcomeEmail } from '@/ai/flows/send-welcome-email';

const googleProvider = new GoogleAuthProvider();

const disabledAuthResponse = {
    user: null,
    error: { message: "Firebase is not configured. Please add your credentials to the .env file."}
};

export const signInWithGoogle = async (): Promise<{ user: User | null; error: any }> => {
  if (!auth) {
      console.error(disabledAuthResponse.error.message);
      return disabledAuthResponse;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const additionalInfo = getAdditionalUserInfo(result);
    if (additionalInfo?.isNewUser && result.user.email) {
      // Fire-and-forget welcome email
      sendWelcomeEmail({ email: result.user.email }).catch(err => console.error("Failed to send welcome email:", err));
    }
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return { user: null, error };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    if (!auth) {
      console.error(disabledAuthResponse.error.message);
      return disabledAuthResponse;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error("Error signing in with email: ", error);
        return { user: null, error };
    }
};

export const signUpWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    if (!auth) {
        console.error(disabledAuthResponse.error.message);
        return disabledAuthResponse;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user.email) {
           // Fire-and-forget welcome email
           sendWelcomeEmail({ email: userCredential.user.email }).catch(err => console.error("Failed to send welcome email:", err));
        }
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error("Error signing up with email: ", error);
        return { user: null, error };
    }
};


export const signOut = async () => {
  if (!auth) return;
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
