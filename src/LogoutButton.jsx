import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/ev-connect/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div style ={{color:"black",cursor:"pointer",backgroundColor:"white",borderRadius:"6px",width:"70px",padding:"1px 5px"}} className="logout" onClick={handleLogout}>Signout</div>
  );
};

export default LogoutButton;
