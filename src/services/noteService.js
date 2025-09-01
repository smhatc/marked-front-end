const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/notes`;

// Create
const createNote = async (noteFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Read All
const indexNotes = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Read One
const showNote = async (noteId) => {
    try {
        const res = await fetch(`${BASE_URL}/${noteId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Update
const updateNote = async (noteId, noteFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${noteId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Delete
const deleteNote = async (noteId) => {
    try {
        const res = await fetch(`${BASE_URL}/${noteId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export { createNote, indexNotes, showNote, updateNote, deleteNote };
