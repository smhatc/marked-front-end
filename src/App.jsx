import { useState } from "react";

import Header from "./components/Header/Header";

import * as authService from "./services/authService";

const App = () => {
    const initialState = authService.getUser();
    const [user, setUser] = useState(initialState);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <>
            <Header user={user} handleSignOut={handleSignOut} />
        </>
    );
};

export default App;
