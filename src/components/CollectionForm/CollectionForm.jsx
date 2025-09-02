import React, { useState, useEffect } from "react";
import "./CollectionForm.css";

const CollectionForm = ({
    initialName = "",
    onCancel = () => {},
    onSave = async () => {},
}) => {
    const [name, setName] = useState(initialName);
    useEffect(() => setName(initialName), [initialName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        await onSave(name.trim());
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="collection-form">
            <label htmlFor="collection-name">Name</label>
            <input
                id="collection-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
            />
            <div className="collection-form-buttons">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="submitbtn">
                    Save
                </button>
            </div>
        </form>
    );
};

export default CollectionForm;
