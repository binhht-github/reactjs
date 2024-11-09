import { getDatabase, ref, query, limitToLast } from "firebase/database";
import { database, db } from "../../firebase";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";

export const fetchData = async () => {
  //   const q = query(collection(db, "Topic"), where("type", "==", "NA-1"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });

  // Get a reference to the collection

  //   const docRef = doc(db, "/Topic", "SF");
  //   const docSnap = await getDoc(docRef);
  const topicRef = collection(db, "Topic");
  const q = query(collection(db, "/Topic"));
  getDocs(topicRef)
    .then(() => {})
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
  //   const querySnapshot = await getDocs(citiesRef)
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  console.log(q);

  //   const citiesRef = collection(db, "Topic");

  // Get all documents from the collection
  //   getDocs(citiesRef)
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         console.log(doc.id, "=>", doc.data());
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error getting documents: ", error);
  //     });
};
