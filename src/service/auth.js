import { firebaseAuth, googleProvider } from "./firebase";

class Auth {
  login(name) {
    const provider = this.getProvider(name);
    return firebaseAuth.signInWithPopup(provider);
  }

  logout() {
    return firebaseAuth.signOut();
  }

  getProvider(name) {
    switch (name) {
      case "Google":
        return googleProvider;
      default:
        throw new Error(`${name} is unknown provider.`);
    }
  }
}
export default Auth;
