import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

export class LamaAuth {
    private static auth: Auth;
    private static app: FirebaseApp;

    static initialize(config: any) {
        if (!this.app && config.apiKey) {
            this.app = initializeApp(config);
            this.auth = getAuth(this.app);
        }
    }

    static async loginWithGithub() {
        if (!this.auth) throw new Error("LamaDB Auth not initialized. Protocol requires valid credentials.");
        const provider = new GithubAuthProvider();
        provider.addScope('repo');
        provider.addScope('user');
        return signInWithPopup(this.auth, provider);
    }

    static async logout() {
        if (!this.auth) return;
        return signOut(this.auth);
    }

    static onAuthStateChanged(callback: (user: User | null) => void) {
        if (!this.auth) {
            callback(null);
            return () => { };
        }
        return onAuthStateChanged(this.auth, callback);
    }

    static getCurrentUser() {
        return this.auth?.currentUser || null;
    }
}
