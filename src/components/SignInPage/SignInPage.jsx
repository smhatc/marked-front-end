import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./SignInPage.css";

const SignInPage = () => {
    const { user, handleSignIn } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const initialState = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);

    let formIsInvalid = true;

    if (formData.username && formData.password) {
        formIsInvalid = false;
    }

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await handleSignIn(formData);
        if (result.success) {
            setFormData(initialState);
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <main>
            <h1 className="sign-in-header">Sign In</h1>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={formData.username}
                    placeholder="Enter your username"
                    type="text"
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    type="password"
                    onChange={handleChange}
                />
                <div className="error-message">
                    {error && <span className="error-icon">!</span>} {error}
                </div>
                <button
                    className="submitbtn"
                    type="submit"
                    disabled={formIsInvalid}
                >
                    Sign In
                </button>
                <p>
                    Don't have an account?{" "}
                    <Link to={"/sign-up"}>Sign up instead</Link>.
                </p>
            </form>
        </main>
    );
};

export default SignInPage;
