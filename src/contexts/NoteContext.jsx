import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} from "react";
import * as noteService from "../services/noteService";

const NoteContext = createContext(null);

const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context)
        throw new Error("useNotes must be used within a NotesProvider");
    return context;
};

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);

    // Create
    const handleAddNote = useCallback(async (noteFormData) => {
        try {
            const newNote = await noteService.createNote(noteFormData);
            setNotes((prev) => [newNote, ...prev]);
            return { success: true, data: newNote };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Read All
    const handleIndexNotes = useCallback(async () => {
        try {
            const notesData = await noteService.indexNotes();
            setNotes(notesData);
            return { success: true, data: notesData };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Read One
    const handleShowNote = useCallback(async (id) => {
        try {
            const noteData = await noteService.showNote(id);
            setNote(noteData);
            return { success: true, data: noteData };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Update
    const handleUpdateNote = useCallback(
        async (id, noteFormData) => {
            try {
                const updatedNote = await noteService.updateNote(
                    id,
                    noteFormData
                );
                setNotes((prev) =>
                    prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
                );
                if (note?.id === updatedNote.id) setNote(updatedNote);
                return { success: true, data: updatedNote };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message };
            }
        },
        [note]
    );

    // Delete
    const handleDeleteNote = useCallback(
        async (id) => {
            try {
                await noteService.deleteNote(id);
                setNotes((prev) => prev.filter((n) => n.id !== id));
                if (note?.id === id) setNote(null);
                return { success: true };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message };
            }
        },
        [note]
    );

    const value = useMemo(
        () => ({
            notes,
            note,
            handleAddNote,
            handleIndexNotes,
            handleShowNote,
            handleUpdateNote,
            handleDeleteNote,
        }),
        [
            notes,
            note,
            handleAddNote,
            handleIndexNotes,
            handleShowNote,
            handleUpdateNote,
            handleDeleteNote,
        ]
    );

    return (
        <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
    );
};

export { useNotes, NotesProvider };
