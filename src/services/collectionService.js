const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/collections`;

const handleResponse = async (res) => {
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok)
        throw new Error(data?.message || res.statusText || "Request failed");
    return data;
};

// Create
const createCollection = async (collectionFormData) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionFormData),
    });
    return handleResponse(res);
};

// Read All
const indexCollections = async () => {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse(res);
};

// Read One
const showCollection = async (collectionId) => {
    const res = await fetch(`${BASE_URL}/${collectionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse(res);
};

// Update
const updateCollection = async (collectionId, collectionFormData) => {
    const res = await fetch(`${BASE_URL}/${collectionId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionFormData),
    });
    return handleResponse(res);
};

// Delete
const deleteCollection = async (collectionId) => {
    const res = await fetch(`${BASE_URL}/${collectionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse(res);
};

export {
    createCollection,
    indexCollections,
    showCollection,
    updateCollection,
    deleteCollection,
};
