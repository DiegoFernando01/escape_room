import ChapterOneExperience from "../../components/experiences/chapters/ChapterOneExperience";
import { Canvas } from "@react-three/fiber";
import Profile from "../../components/profile/Profile";
import { UserAuth } from "../../context/AuthContext";
import GameStartMessage from "../../world/staging/StartGame";
import styles from "./ChapterOne.module.css";

const ChapterOne = () => {
  const { user, logout } = UserAuth();

  return (
    <>
      {/* <Profile picture={user.picture} name={user.name} email={user.email} /> */}
      <button className={styles.button} onClick={logout}>
        Logout
      </button>
      <GameStartMessage /> {/* Agrega el mensaje de inicio */}
      <Canvas shadows>
        <ChapterOneExperience />;
      </Canvas>
    </>
  );
};

export default ChapterOne;
