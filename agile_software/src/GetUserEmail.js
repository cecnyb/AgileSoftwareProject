import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export const getUserEmail = async (currentUser) => {
  try {
    const db = getFirestore();
    const usersCollectionRef = collection(db, 'users');
    const usersQuery = query(usersCollectionRef, where('uid', '==', currentUser));
    const usersSnapshot = await getDocs(usersQuery);
    const userDoc = usersSnapshot.docs[0];
    if (userDoc) {
      const userData = userDoc.data();
      return userData.email;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user email:', error);
    return null;
  }
};

export default getUserEmail;
