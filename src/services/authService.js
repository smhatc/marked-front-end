const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/auth`;

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
        if (!res.ok) throw new Error(data.detail || "Something went wrong");
        if (data.token && data.username) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            return data.username;
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
        if (!res.ok) throw new Error(data.detail || "Something went wrong");
        if (data.token && data.username) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            return data.username;
        }
    } catch (error) {
        throw error;
    }
};

const getUser = () => {
    const username = localStorage.getItem("username");
    if (username) {
        return username;
    } else return null;
};

export { signUp, signIn, getUser };
