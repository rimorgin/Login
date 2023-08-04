import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const officialsCollectionRef = collection(db, "officials");
class OfficialsDataService {
  addOfficial = (newOfficial) => {
    return addDoc(officialsCollectionRef, newOfficial);
  };

  updateOfficial = (id, updatedOfficial) => {
    const officialDoc = doc(db, "officials", id);
    return updateDoc(officialDoc, updatedOfficial);
  };

  deleteOfficial = (id) => {
    const official = doc(db, "officials", id);
    return deleteDoc(official);
  };

  getAllOfficials = () => {
    return getDocs(officialsCollectionRef);
  };

  getOfficial = (id) => {
    const official = doc(db, "officials", id);
    return getDoc(official);
  };
}

export default new OfficialsDataService();
