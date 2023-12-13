import ProjectRoutes from "./routes/ProjectRoutes";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <ProjectRoutes />
    </AuthContextProvider>
  );
};

export default App;