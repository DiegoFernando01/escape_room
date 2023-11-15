import Bedroom from "../../../world/rooms/Bedroom";
import Bed from "../../../world/elements/Bed";
import Lights from "../../../world/staging/Lights";

const ChapterOneExperience = () => {
  return (
    <>
      <Bedroom />
      <Bed position={[2.5, 0.2, 5]} rotation-y={Math.PI * 0.95} />
      <Lights />
    </>
  );
};

export default ChapterOneExperience;
