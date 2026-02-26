import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (user) {
          navigate("/admin");
        }

        return (
          <div>
            <h2>Mirë se erdhe admin</h2>
            <p>{user?.username}</p>
            <button onClick={signOut}>Logout</button>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default AdminLogin;
