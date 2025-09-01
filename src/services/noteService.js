const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/notes`;

// Create
const createNote = async (noteFormData) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(noteFormData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Create note failed");
    return json;
};

// Read All
const indexNotes = async () => {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Fetch notes failed");
    return json;
};

// Read One
const showNote = async (noteId) => {
    const res = await fetch(`${BASE_URL}/${noteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Fetch note failed");
    return json;
};

// Update
const updateNote = async (noteId, noteFormData) => {
    const res = await fetch(`${BASE_URL}/${noteId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(noteFormData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Update note failed");
    return json;
};

// Delete
const deleteNote = async (noteId) => {
    const res = await fetch(`${BASE_URL}/${noteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Delete note failed");
    }
    return { success: true };
};

export { createNote, indexNotes, showNote, updateNote, deleteNote };
