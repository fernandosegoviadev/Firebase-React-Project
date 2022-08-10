import {db} from './firebase.js';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, query, doc, where } from "firebase/firestore";

export async function addDataBase (data) {
    if (data) {
        try {
            const docRef = await addDoc(collection(db, "companies"), data);
            // console.log("Document 1 weitten with ID:", docRef.id);
        } catch (e) {
            console.log("Error adding document:", e)
        }
    }
}
export async function getDataBase () {
    const result = await getDocs(query(collection(db, "companies")));
    return result;
}

export async function deleteDataBase (uid) {
    const docDeleted = await deleteDoc(doc(db, "companies", uid));
    return docDeleted;
}

export async function updateDataBase (uid, data) {
    // console.log('se ejecutó updateData')
    const docUpdated = await updateDoc(doc(db, "companies", uid), data);
    return docUpdated;
}

export async function searchDataBase (search) { 
    // console.log(search, 'llega a la función')
    // search va a se un objeto que trae parametros de búsqueda
    // search = { firs: "Fernando" } || { last: "Segovia"} || { born: 1988 };
    // console.log(Object.entries(search)[0]); // [ 'firs', 'Fernando' ] (primer caso)
    // const q = query(collection(db, "users"), where("first", "==", "Fernando"));
    
    let property = Object.entries(search)[0][0];
    let value = Object.entries(search)[0][1];
    const q = query(collection(db, "companies"), where(property, "==", `${value}`));
    const querySnapshot = await getDocs(q);
    
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    return querySnapshot;
}