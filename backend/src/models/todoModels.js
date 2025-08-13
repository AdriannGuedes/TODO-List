const { db, FieldValue } = require("../config/firebase");
const collection = db.collection(process.env.FIREBASE_COLLECTION || "tarefas");

async function findAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function searchByTitle(query) {
    const snapshot = await collection
        .where("title", ">=", query)
        .where("title", "<=", query + "\uf8ff")
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function create(todo) {
    if (todo.completed === undefined) {
        todo.completed = false;
    }
    todo.createdAt = FieldValue.serverTimestamp();
    const docRef = await collection.add(todo);
    return { id: docRef.id, ...todo };
}

async function update(id, data) {
    data.updatedAt = FieldValue.serverTimestamp();
    await collection.doc(id).update(data);
    const updatedDoc = await collection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
}

async function remove(id) {
    await collection.doc(id).delete();
    return { message: "Atividade excluída com sucesso." };
}

module.exports = { findAll, searchByTitle, create, update, remove };

