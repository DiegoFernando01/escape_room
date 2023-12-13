import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ProjectRoutes from "./routes/ProjectRoutes";
const App = () => {
  return (
    <>
      <ProjectRoutes />
      <Login/>
      <SignUp/>
    </>
  );
};

export default App;
