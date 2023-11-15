import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../configs/supabase.config";
import { useNavigate } from "react-router-dom/dist";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  async function login() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error during logout");
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Supabase Event: ", event);
        if (session == null) {
          navigate("/login", { replace: true });
          console.log("Not Logged In");
        } else {
          setUser(session?.user.user_metadata);
          const { user } = session;
          console.log("User Data", session?.user.user_metadata);
          navigate("/", { replace: true });
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Error: ", "Error creating Auth Context");
  }
  return context;
};
