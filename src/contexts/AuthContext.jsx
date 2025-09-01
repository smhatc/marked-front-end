import { createContext, useContext, useState, useMemo } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};

const AuthProvider = ({ children }) => {
    const initialState = authService.getUser();
    const [user, setUser] = useState(initialState);

    const handleSignUp = async (formData) => {
        try {
            const res = await authService.signUp(formData);
            setUser(res);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const handleSignIn = async (formData) => {
        try {
            const res = await authService.signIn(formData);
            setUser(res);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, handleSignUp, handleSignIn, handleSignOut }),
        [user, handleSignUp, handleSignIn, handleSignOut]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
