import { getFirestore, Firestore, collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc, CollectionReference } from "firebase/firestore";

export class LamaStore {
    private db: Firestore | null = null;

    initialize(app: any) {
        this.db = getFirestore(app);
    }

    collection(name: string) {
        if (!this.db) {
            throw new Error("LamaDB Store not initialized. Data synchronization offline.");
        }

        const colRef = collection(this.db, name);

        return {
            add: async (data: any) => addDoc(colRef, data),
            get: async () => {
                const snapshot = await getDocs(query(colRef));
                return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            },
            doc: (id: string) => {
                const docRef = doc(this.db!, name, id);
                return {
                    set: async (data: any) => setDoc(docRef, data),
                    update: async (data: any) => updateDoc(docRef, data),
                    delete: async () => deleteDoc(docRef),
                    get: async () => {
                        // Implementation for get single doc
                        return null;
                    }
                }
            },
            whereUser: (userId: string) => {
                return query(colRef, where("userId", "==", userId));
            }
        };
    }
}
