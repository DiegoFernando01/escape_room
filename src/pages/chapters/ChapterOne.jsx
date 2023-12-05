import ChapterOneExperience from "../../components/experiences/chapters/ChapterOneExperience";
import StartGameC1 from "../../components/experiences/chapters/StartGameC1"



const ChapterOne = () => {
  const { user, logout } = UserAuth();

  return (
    <>
      <ChapterOneExperience />;
      <StartGameC1 />
    </>
  );
};

export default ChapterOne;

