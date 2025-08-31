import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
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
                <Link to="https://www.linkedin.com/in/smhatc" target="_blank">
                    LinkedIn
                </Link>{" "}
                |{" "}
                <Link
                    to={"https://github.com/smhatc/marked-front-end"}
                    target="_blank"
                >
                    GitHub
                </Link>
                <br />
                <Link
                    to={"https://www.flaticon.com/free-icons/notepad"}
                    target="_blank"
                >
                    Logo by Flaticon
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
