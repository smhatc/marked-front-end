const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/api/v1/auth`;

const signUp = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        if (data.token) {
            localStorage.setItem("token", data.token);
            const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
            return decodedToken;
        }
    } catch (error) {
        throw error;
    }
};

const signIn = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        if (data.token) {
            localStorage.setItem("token", data.token);
            const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
            return decodedToken;
        }
    } catch (error) {
        throw error;
    }
};

const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken;
    } else {
        return null;
    }
};

export { signUp, signIn, getUser };
