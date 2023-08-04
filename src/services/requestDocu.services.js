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

const requestedDocuCollectionRef = collection(db, "requestedDocuments");
class RequestDataService {
  addRequest = (newRequest) => {
    return addDoc(requestedDocuCollectionRef, newRequest);
  };

  updateRequest = (id, updatedRequest) => {
    const requestDoc = doc(db, "requestedDocuments", id);
    return updateDoc(requestDoc, updatedRequest);
  };

  deleteRequest = (id) => {
    const requestDoc = doc(db, "requestedDocuments", id);
    return deleteDoc(requestDoc);
  };

  getAllRequests = () => {
    return getDocs(requestedDocuCollectionRef);
  };

  getRequest = (id) => {
    const requestDoc = doc(db, "requestedDocuments", id);
    return getDoc(requestDoc);
  };
}

export default new RequestDataService();
