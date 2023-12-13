import ChapterOneExperience from "../../components/experiences/chapters/ChapterOne/ChapterOneExperience";
import { Canvas } from "@react-three/fiber";
import Profile from "../../components/profile/Profile";
import { UserAuth } from "../../context/AuthContext";
import GameStartMessage from "../../world/staging/StartGame";
import styles from "./ChapterOne.module.css";
import StartGameC1 from "../../components/experiences/chapters/StartGameC1";

const ChapterOne = () => {
  const { user, logout } = UserAuth();

  return (
    <>
      <button className={styles.button} onClick={logout}>
        Logout
      </button>
      <ChapterOneExperience />;
      <StartGameC1 />
    </>
  );
};

export default ChapterOne;
