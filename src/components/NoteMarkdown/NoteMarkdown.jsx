import React from "react";
import { useNotes } from "../../contexts/NoteContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "./NoteMarkdown.css";

const NoteMarkdown = ({
    note = null,
    onEdit = () => {},
    onDeleted = () => {},
    onClose = () => {},
}) => {
    const { handleDeleteNote } = useNotes();
    if (!note) return null;

    const id = note.id ?? note._id;

    const doDelete = async () => {
        if (!id) return;
        await handleDeleteNote(id);
        onDeleted();
    };

    return (
        <div className="note-markdown-container">
            <div className="note-markdown-head">
                <button className=" dangerbtn" onClick={doDelete}>
                    Delete
                </button>
                <button type="button" onClick={() => onClose()}>
                    Close
                </button>
            </div>
            <div className="note-markdown-body" onClick={() => onEdit(note)}>
                <h1 className="note-markdown-body-header">
                    {note.title || "(Untitled)"}
                </h1>
                <div className="note-markdown-body-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        children={note.content ?? ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteMarkdown;
