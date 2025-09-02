import React, { useEffect, useMemo, useState } from "react";
import CollectionForm from "../CollectionForm/CollectionForm";
import "./CollectionsAndNotesList.css";

const CollectionsAndNotesList = ({
    collections = [],
    notes = [],
    onSelectNote = () => {},
    onNewNote = () => {},
    onSaveCollection = async () => {},
    onDeleteCollection = async () => {},
}) => {
    const [collapsed, setCollapsed] = useState({});
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [editingCollectionId, setEditingCollectionId] = useState(null);
    const [menuOpenFor, setMenuOpenFor] = useState(null);

    const getNoteCollectionId = (n) => {
        const raw =
            n?.collectionId ?? n?.collection_id ?? n?.collection?.id ?? null;
        return raw == null ? null : String(raw);
    };

    const { groupedMap, NO_COL } = useMemo(() => {
        const map = new Map();
        const NO = "__no_col";
        (notes || []).forEach((n) => {
            const key = getNoteCollectionId(n) ?? NO;
            const arr = map.get(key) || [];
            arr.push(n);
            map.set(key, arr);
        });
        return { groupedMap: map, NO_COL: NO };
    }, [notes]);

    useEffect(() => {
        const init = {};
        (collections || []).forEach((c) => {
            init[String(c.id ?? c._id)] = true;
        });
        setCollapsed((prev) => ({ ...init, ...prev }));
    }, [collections]);

    const toggleCollapsed = (idStr) =>
        setCollapsed((p) => ({ ...p, [idStr]: !p[idStr] }));

    const startNewCollection = () => {
        setEditingCollectionId(null);
        setShowCollectionForm(true);
    };

    const startEditCollection = (col) => {
        setEditingCollectionId(String(col.id ?? col._id));
        setShowCollectionForm(true);
        setMenuOpenFor(null);
    };

    const handleSave = async (name) => {
        await onSaveCollection(editingCollectionId, name);
        setShowCollectionForm(false);
        setEditingCollectionId(null);
    };

    const handleDelete = async (col) => {
        await onDeleteCollection(col.id ?? col._id);
        setMenuOpenFor(null);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-controls">
                <button onClick={() => onNewNote()}>+ New Note</button>
                <button onClick={startNewCollection}>+ New Collection</button>
            </div>

            {showCollectionForm && (
                <CollectionForm
                    initialName={
                        (collections || []).find(
                            (c) =>
                                String(c.id ?? c._id) ===
                                String(editingCollectionId)
                        )?.name ?? ""
                    }
                    onCancel={() => {
                        setShowCollectionForm(false);
                        setEditingCollectionId(null);
                    }}
                    onSave={handleSave}
                />
            )}

            <div className="collection-list">
                {(collections || []).map((col) => {
                    const idStr = String(col.id ?? col._id);
                    const isCollapsed = !!collapsed[idStr];
                    const childNotes = groupedMap.get(idStr) || [];
                    return (
                        <div key={idStr} className="collection-block">
                            <div className="collection-row">
                                <button
                                    className="chev-btn"
                                    onClick={() => toggleCollapsed(idStr)}
                                >
                                    {isCollapsed ? "⤷" : "⤵"}
                                </button>

                                <div
                                    className="collection-name"
                                    onClick={() => toggleCollapsed(idStr)}
                                >
                                    {col.name}
                                </div>

                                <div className="collection-menu">
                                    <button
                                        className="menu-btn"
                                        onClick={() =>
                                            setMenuOpenFor(
                                                menuOpenFor === idStr
                                                    ? null
                                                    : idStr
                                            )
                                        }
                                    >
                                        ⋯
                                    </button>
                                </div>
                            </div>

                            {menuOpenFor === idStr && (
                                <div className="menu-popover">
                                    <button
                                        className="dangerbtn"
                                        onClick={() => handleDelete(col)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => startEditCollection(col)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}

                            {!isCollapsed && childNotes.length > 0 && (
                                <div className="nested-notes">
                                    {childNotes.map((n) => (
                                        <div
                                            key={n.id ?? n._id}
                                            className="note-row"
                                            onClick={() => onSelectNote(n)}
                                        >
                                            <div className="note-title">
                                                {n.title || "(Untitled)"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <hr className="collections-notes-hr" />

            <div className="notes-list">
                {(groupedMap.get(NO_COL) || []).map((n) => (
                    <div
                        key={n.id ?? n._id}
                        className="note-row"
                        onClick={() => onSelectNote(n)}
                    >
                        <div className="note-title">
                            {n.title || "(Untitled)"}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default CollectionsAndNotesList;
