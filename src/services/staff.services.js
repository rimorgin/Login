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

const staffsCollectionRef = collection(db, "staffs");
class StaffDataService {
  addStaff = (newStaff) => {
    return addDoc(staffsCollectionRef, newStaff);
  };

  updateStaff = (id, updatedStaff) => {
    const staffDoc = doc(db, "staffs", id);
    return updateDoc(staffDoc, updatedStaff);
  };

  deleteStaff = (id) => {
    const staffDoc = doc(db, "staffs", id);
    return deleteDoc(staffDoc);
  };

  getAllStaffs = () => {
    return getDocs(staffsCollectionRef);
  };

  getStaff = (id) => {
    const staffDoc = doc(db, "staffs", id);
    return getDoc(staffDoc);
  };
}

export default new StaffDataService();
