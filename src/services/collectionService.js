const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/collections`;

// Create
const createCollection = async (collectionFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Read All
const indexCollections = async () => {
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
const showCollection = async (collectionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
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
const updateCollection = async (collectionId, collectionFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Delete
const deleteCollection = async (collectionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
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

export {
    createCollection,
    indexCollections,
    showCollection,
    updateCollection,
    deleteCollection,
};
