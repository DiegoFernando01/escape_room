import { Route, Routes } from "react-router-dom";
import ChapterOne from "../pages/chapters/ChapterOne";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";
import Introduction from "../pages/introduction/IntroductionExp";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChapterOne />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chapter_one" element={<ChapterOne />} />
        <Route path="/introduction" element={<Introduction />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
