import { useState } from "react";
import { Routes, Route } from "react-router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./components/SignUpPage/SignUpPage";

import * as authService from "./services/authService";

const App = () => {
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
        setUser(null);
    };

    return (
        <>
            <Header user={user} handleSignOut={handleSignOut} />
            <Routes>
                <Route
                    path="/sign-up"
                    element={
                        <SignUpPage user={user} handleSignUp={handleSignUp} />
                    }
                />

                {/* <Route
                    path="/sign-in"
                    element={
                        <SignInPage handleSignIn={handleSignIn} user={user} />
                    }
                /> */}
            </Routes>
            {!user && <Footer />}
        </>
    );
};

export default App;
