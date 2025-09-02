import React, { useEffect, useState } from "react";
import { useNotes } from "../../contexts/NoteContext";
import "./NoteForm.css";

const NoteForm = ({ noteId = null, onSaved = () => {}, collections = [] }) => {
    const { handleShowNote, handleAddNote, handleUpdateNote } = useNotes();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        collectionId: null,
    });
    const [loading, setLoading] = useState(false);

    const extract = (res) => res?.data ?? res ?? null;
    const getNoteCollectionId = (n) => {
        const raw =
            n?.collectionId ?? n?.collection_id ?? n?.collection?.id ?? null;
        return raw == null ? null : String(raw);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!noteId) {
                if (mounted)
                    setFormData({ title: "", content: "", collectionId: null });
                return;
            }
            setLoading(true);
            const res = await handleShowNote(noteId);
            const note = extract(res);
            if (mounted && note) {
                setFormData({
                    title: note.title ?? "",
                    content: note.content ?? "",
                    collectionId: getNoteCollectionId(note),
                });
            }
            setLoading(false);
        })();
        return () => {
            mounted = false;
        };
    }, [noteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleCollectionChange = (e) => {
        const v = e.target.value;
        setFormData((f) => ({ ...f, collectionId: v || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const collectionIdNumber =
            formData.collectionId == null || formData.collectionId === ""
                ? null
                : Number(formData.collectionId);

        const payload = {
            title: formData.title,
            content: formData.content,
            collection_id: collectionIdNumber,
        };

        let res;
        if (noteId) {
            res = await handleUpdateNote(noteId, payload);
        } else {
            res = await handleAddNote(payload);
        }

        const saved = res?.data ?? res ?? null;
        if (saved) onSaved(saved);
    };

    const formIsInvalid = !(formData.title && formData.content);

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title..."
                    />
                </div>

                <div>
                    <label>Collection</label>
                    <select
                        value={formData.collectionId ?? ""}
                        onChange={handleCollectionChange}
                    >
                        <option value="">-- No Collection --</option>
                        {(collections || []).map((c) => (
                            <option
                                key={c.id ?? c._id}
                                value={String(c.id ?? c._id)}
                            >
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <label>Content</label>
            <textarea
                className="note-form-contentinput"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter Markdown..."
            />

            <button
                className="submitbtn"
                type="submit"
                disabled={formIsInvalid || loading}
            >
                Save
            </button>
        </form>
    );
};

export default NoteForm;
