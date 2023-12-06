import { Route, Routes } from "react-router-dom";
import ChapterOne from "../pages/chapters/ChapterOne";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChapterOne />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chapter_one" element={<ChapterOne />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
