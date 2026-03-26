import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login({ setIsLoggedIn, setRole }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setIsLoggedIn(true);

      if (email === "irfan.bin.abdul.shukoor@gmail.com") {
        setRole("admin");
      } else {
        setRole("user");
      }

    } catch (error) {
      alert(error.code);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created ✅");
    } catch (error) {
      alert(error.code);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>

      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>

        {/* ✅ FIXED HEADER */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="logo"
          width="60"
        />
        <h2 style={{ margin: "10px 0" }}>E-Learn</h2>

        <p style={{ color: "gray", marginBottom: "20px" }}>
          Learn anything, anytime
        </p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={loginBtn}>
          Login
        </button>

        <button onClick={handleSignup} style={signupBtn}>
          Create Account
        </button>

      </div>
    </div>
  );
}

/* STYLES */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const loginBtn = {
  width: "100%",
  padding: "10px",
  background: "#2196f3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginBottom: "10px",
  cursor: "pointer"
};

const signupBtn = {
  width: "100%",
  padding: "10px",
  background: "#764ba2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Login;