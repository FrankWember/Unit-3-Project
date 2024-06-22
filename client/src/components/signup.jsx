import React, { useState } from "react";
import { signupUser } from "../services/api";

const signUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signupUser(username, password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="form">
        <h4>Log in to account</h4>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SignIn</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default signUp;
