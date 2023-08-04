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

const eventsCollectionRef = collection(db, "events");
class EventDataService {
  addEvents = (newEvents) => {
    return addDoc(eventsCollectionRef, newEvents);
  };

  updateEvents = (id, updatedEvents) => {
    const eventsDoc = doc(db, "events", id);
    return updateDoc(eventsDoc, updatedEvents);
  };

  deleteEvents = (id) => {
    const eventsDoc = doc(db, "events", id);
    return deleteDoc(eventsDoc);
  };

  getAllEvents = () => {
    return getDocs(eventsCollectionRef);
  };

  getEvents = (id) => {
    const eventsDoc = doc(db, "events", id);
    return getDoc(eventsDoc);
  };
}

export default new EventDataService();
