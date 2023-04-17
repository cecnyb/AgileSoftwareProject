import { signout } from "./firebase";

const Profile = () => {
  const handleLogout = async () => {
   await signout();
  };
  return (
    <>
      <h1>Profile</h1>
 <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;