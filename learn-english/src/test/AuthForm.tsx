import React, { useState } from "react";
import { signIn, signUp } from "./AuthenRest";
import { getDatabase } from "firebase/database";
import { db } from "../firebase";

const AuthForm = () => {
    // const databae = db;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                const data = await signUp(email, password);
                console.log("Sign-Up Successful:", data);
            } else {
                const data = await signIn(email, password);
                localStorage.setItem("token", data.idToken);
                localStorage.setItem("uid", data.localId);
                console.log("Sign-In Successful:", data);
            }
        } catch (error: any) {
            console.error("Authentication Error:", error.message);
        }
    };

    return (
        <div>
            <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                Switch to {isSignUp ? "Sign In" : "Sign Up"}
            </button>
        </div>
    );
};

export default AuthForm;
