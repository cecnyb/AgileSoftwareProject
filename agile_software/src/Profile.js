import { signOut } from "./firebase";

const Profile = () => {
  const handleLogout = async () => {
   await signOut();
  };
  return (
    <>
      <h1>Profile</h1>
 <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;