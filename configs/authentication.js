import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from '../lib/exports-firebase.js';

export const auth = getAuth();

export function registerUser(displayName, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName,
      }).then(() => {
        const user = userCredential.user;
        return user;
      }).catch((error) => error);
    });
}

export function userWithLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function isLoggedIn(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user !== null);
  });
}

export function logout() {
  return signOut(auth);
}

export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
