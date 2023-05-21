import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export const getUserRole = async (currentUser) => {
  try {
    const db = getFirestore();
    const usersCollectionRef = collection(db, 'users');
    const usersQuery = query(usersCollectionRef, where('uid', '==', currentUser.uid));
    const usersSnapshot = await getDocs(usersQuery);
    const userDoc = usersSnapshot.docs[0];
    if (userDoc) {
      const userData = userDoc.data();
      console.log("userDoc found with role null: " + userDoc)
      return userData.role;
    }
    console.log("userDoc not found: " + userDoc)

    return null;
  } catch (error) {
    console.error('Error retrieving user email:', error);
    return null;
  }
};

export default getUserRole;
