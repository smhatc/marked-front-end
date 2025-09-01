import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./Footer.css";

const Footer = () => {
    const { user } = useAuth();
    if (user) return null;

    return (
        <footer className="page-footer">
            <div className="page-footer-branding">
                <Link to={"/"}>
                    <img
                        className="page-footer-branding-logo"
                        src="/assets/images/logo.png"
                        alt="Marked Logo"
                    />
                </Link>
                <p className="page-footer-branding-copyright">
                    &copy; 2025 Marked
                </p>
            </div>

            <p className="page-footer-contact">
                <a href="https://www.linkedin.com/in/smhatc" target="_blank">
                    LinkedIn
                </a>{" "}
                |{" "}
                <a
                    href={"https://github.com/smhatc/marked-front-end"}
                    target="_blank"
                >
                    GitHub
                </a>
                <br />
                <a
                    href={"https://www.flaticon.com/free-icons/notepad"}
                    target="_blank"
                >
                    Logo by Flaticon
                </a>
            </p>
        </footer>
    );
};

export default Footer;
