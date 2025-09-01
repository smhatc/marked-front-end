import { Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { NotesProvider } from "./contexts/NoteContext";
import { CollectionsProvider } from "./contexts/CollectionContext";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/sign-up" element={<SignUpPage />} />

                <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
};

export default App;
