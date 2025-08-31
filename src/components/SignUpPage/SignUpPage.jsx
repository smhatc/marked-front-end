import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./SignUpPage.css";

const SignUpPage = ({ user, handleSignUp }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const initialState = {
        username: "",
        password: "",
        passwordConf: "",
    };

    const [formData, setFormData] = useState(initialState);

    let formIsInvalid = true;

    if (
        formData.username &&
        formData.password &&
        formData.password === formData.passwordConf
    ) {
        formIsInvalid = false;
    }

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await handleSignUp(formData);
        if (result.success) {
            setFormData(initialState);
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <main>
            <h1 className="sign-up-header">Sign Up</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={formData.username}
                    placeholder="Create a username"
                    type="text"
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Create a password"
                    type="password"
                    onChange={handleChange}
                />
                <label htmlFor="passwordConf">Confirm Password</label>
                <input
                    id="passwordConf"
                    name="passwordConf"
                    value={formData.passwordConf}
                    placeholder="Confirm your password"
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
                    Sign Up
                </button>
                <p>
                    Already have an account?{" "}
                    <Link to={"/sign-in"}>Sign in instead</Link>.
                </p>
            </form>
        </main>
    );
};

export default SignUpPage;
