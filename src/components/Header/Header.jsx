import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

const Header = () => {
    const { user, handleSignOut } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);

    const headerRef = useRef(null);
    const profileToggleRef = useRef(null);
    const profileMenuRef = useRef(null);

    // Sticky header opacity (adds/removes CSS class based on scroll)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const onScroll = () => {
            if (!headerRef.current) return;
            if (window.scrollY > 0)
                headerRef.current.classList.add("page-header-sticky");
            else headerRef.current.classList.remove("page-header-sticky");
        };

        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        if (typeof document === "undefined") return;

        const onDocClick = (e) => {
            if (!profileMenuRef.current || !profileToggleRef.current) return;
            const target = e.target;
            if (
                profileOpen &&
                !profileMenuRef.current.contains(target) &&
                !profileToggleRef.current.contains(target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, [profileOpen]);

    const toggleProfile = () => setProfileOpen((s) => !s);

    return (
        <header ref={headerRef} className="page-header">
            <div className="page-header-branding">
                <Link to={"/"}>
                    <img
                        className="page-header-branding-logo"
                        src="/assets/images/logo.png"
                        alt="Marked Logo"
                    />
                </Link>
                <p className="page-header-branding-title">
                    <Link to={"/"}>Marked</Link>
                </p>
            </div>

            <div style={{ userSelect: "none", WebkitUserSelect: "none" }}>
                <nav className="page-header-controls">
                    <div className="profile-container header-controls-profile">
                        <button
                            ref={profileToggleRef}
                            className="profile-picture"
                            id="profileToggle"
                            onClick={toggleProfile}
                        >
                            {user && typeof user === "string" ? (
                                user[0].toUpperCase()
                            ) : (
                                <img
                                    className="profile-picture-genericimg"
                                    src="/assets/images/profile.png"
                                    alt="Generic Profile Picture"
                                />
                            )}
                        </button>

                        {profileOpen && (
                            <div
                                ref={profileMenuRef}
                                className="profile-dropdown"
                                id="profileMenu"
                            >
                                {user && typeof user === "string" ? (
                                    <>
                                        <div className="profile-user">
                                            {user}
                                        </div>
                                        <Link
                                            className="signout-button"
                                            to={"/"}
                                            onClick={(e) => {
                                                setProfileOpen(false);
                                                handleSignOut &&
                                                    handleSignOut(e);
                                            }}
                                        >
                                            Sign Out
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            className="sign-in-link"
                                            to={"/sign-in"}
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            className="sign-up-link"
                                            to={"/sign-up"}
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
