const firebase = require('firebase');
const { firebaseConfig } = require('../config/config.json');

class FirebaseDataStore {

    constructor(collection) {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore().collection(collection);
    }

    async findAll() {
        let data = await this.db.get().then((querySnapshot) => {
            return querySnapshot.docs;
        });

        data = data.map((queryDocSnapshot) => {
            return { ...queryDocSnapshot.data(), ...{ id: queryDocSnapshot.id } };
        });

        return data;
    }

    async findOneById(id) {
        const dataQuery = this.db.doc(id);
        let data = await dataQuery.get();

        return { ...data.data(), ...{ id: data.id } };
    }

    async addOne(data) {
        const dataRef = await this.db.add(data).then((docRef) => {
            return docRef;
        });
    
        return dataRef;
    }
}

module.exports = FirebaseDataStore;
