import { Route, Routes } from "react-router-dom";
import ChapterOne from "../pages/chapters/ChapterOne";
import ChapterTwo from "../pages/chapters/ChapterTwo";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";
import Introduction from "../pages/introduction/IntroductionExp";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChapterOne />} />
        <Route index element={<ChapterTwo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chapter_one" element={<ChapterOne />} />
        <Route path="/chapter_two" element={<ChapterTwo />} />
        <Route path="/introduction" element={<Introduction />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
