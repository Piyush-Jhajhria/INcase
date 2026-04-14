import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { auth } from '../config/firebase';
import type { LoginFormData, SignupFormData } from '../types/auth';

const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const signUp = async (data: SignupFormData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: `${data.firstName} ${data.lastName}`
      });
    }
    
    return userCredential;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

export const signIn = async (data: LoginFormData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

export const logOut = async (): Promise<void> => {
  return signOut(auth);
};