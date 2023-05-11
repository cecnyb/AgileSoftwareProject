import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};

function HomePage() {
  const currentUser = useRequireAuth();
  var userEmail = "";
  if(currentUser){
    userEmail=currentUser.email;
  }

  return (
    <div className="text-center pt-5">
      <header>
        Welcome to your education {userEmail}
      </header>
      {chapters.map((chapter) => (
        <ChapterComponent chapter={chapter} key={chapter.id} />
      ))}
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Logga ut" />
      </form>
    </div>
  );
}

export default HomePage;
