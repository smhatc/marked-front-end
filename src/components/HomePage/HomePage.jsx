import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useNotes } from "../../contexts/NoteContext";
import { useCollections } from "../../contexts/CollectionContext";
import CollectionsAndNotesList from "../CollectionsAndNotesList/CollectionsAndNotesList";
import NoteForm from "../NoteForm/NoteForm";
import NoteMarkdown from "../NoteMarkdown/NoteMarkdown";
import "./HomePage.css";

const HomePage = () => {
    const { user } = useAuth();

    const {
        handleIndexNotes,
        handleShowNote,
        handleAddNote,
        handleUpdateNote,
        handleDeleteNote,
    } = useNotes();

    const {
        handleIndexCollections,
        handleAddCollection,
        handleUpdateCollection,
        handleDeleteCollection,
    } = useCollections();

    const [notesList, setNotesList] = useState([]);
    const [collectionsList, setCollectionsList] = useState([]);

    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [currentNote, setCurrentNote] = useState(null);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [editingCollectionId, setEditingCollectionId] = useState(null);

    const extract = (res) => res?.data ?? res ?? null;

    const refreshNotes = async () => {
        const res = await handleIndexNotes();
        const raw = res?.data ?? res ?? [];
        setNotesList(Array.isArray(raw) ? raw : []);
    };

    const refreshCollections = async () => {
        const res = await handleIndexCollections();
        const raw = res?.data ?? res ?? [];
        setCollectionsList(Array.isArray(raw) ? raw : []);
    };

    const refreshAll = async () => {
        await Promise.all([refreshCollections(), refreshNotes()]);
    };

    useEffect(() => {
        refreshAll();
    }, []);

    const showPreviewForNote = async (noteOrId) => {
        const id =
            typeof noteOrId === "object"
                ? noteOrId.id ?? noteOrId._id
                : noteOrId;
        if (!id) return;
        const res = await handleShowNote(id);
        const note = extract(res);
        if (!note) return;
        setSelectedNoteId(note.id ?? note._id ?? null);
        setCurrentNote(note);
        setShowPreview(true);
        setShowNoteForm(false);
    };

    const openFormForEdit = (noteId) => {
        setSelectedNoteId(noteId ?? null);
        setShowNoteForm(true);
        setShowPreview(false);
    };

    const handleNoteSaved = async (savedRes) => {
        const saved = extract(savedRes);
        if (!saved) return;
        await refreshNotes();
        await showPreviewForNote(saved);
    };

    const handleNoteDeleted = async () => {
        await refreshNotes();
        setSelectedNoteId(null);
        setCurrentNote(null);
        setShowPreview(false);
        setShowNoteForm(false);
    };

    const saveCollection = async (maybeId, name) => {
        if (maybeId) {
            const idForBackend = isNaN(Number(maybeId))
                ? maybeId
                : Number(maybeId);
            await handleUpdateCollection(idForBackend, { name });
        } else {
            await handleAddCollection({ name });
        }
        await refreshAll();
    };

    const deleteCollection = async (id) => {
        const idForBackend = id;
        await handleDeleteCollection(idForBackend);
        await refreshAll();
    };

    return (
        <main>
            {user ? (
                <div className="home-workspace">
                    <section className="home-workspace-sidebar">
                        <CollectionsAndNotesList
                            collections={collectionsList}
                            notes={notesList}
                            onSelectNote={(noteOrId) =>
                                showPreviewForNote(noteOrId)
                            }
                            onNewNote={() => {
                                setSelectedNoteId(null);
                                setCurrentNote(null);
                                openFormForEdit(null);
                            }}
                            onSaveCollection={(id, name) =>
                                saveCollection(id, name)
                            }
                            onDeleteCollection={(id) => deleteCollection(id)}
                        />
                    </section>

                    <section className="home-workspace-editarea">
                        {showPreview ? (
                            <NoteMarkdown
                                note={currentNote}
                                onEdit={(n) => openFormForEdit(n.id ?? n._id)}
                                onDeleted={() => handleNoteDeleted()}
                                onClose={() => {
                                    setShowPreview(false);
                                }}
                            />
                        ) : showNoteForm ? (
                            <NoteForm
                                noteId={selectedNoteId}
                                onSaved={(saved) => handleNoteSaved(saved)}
                                collections={collectionsList}
                                onClose={() => {
                                    setShowNoteForm(false);
                                    setSelectedNoteId(null);
                                }}
                            />
                        ) : (
                            <div className="home-workspace-editarea-placeholder">
                                <h1>
                                    [ Select a note
                                    <br />
                                    or <br />
                                    create a new one ]
                                </h1>
                            </div>
                        )}
                    </section>
                </div>
            ) : (
                <>
                    <section className="home-hero">
                        <div className="home-hero-text">
                            <h1 className="home-hero-text-heading">
                                Organize your thoughts,
                                <br />
                                one Markdown note at a time.
                            </h1>

                            <div className="home-hero-text-subheading">
                                <p className="home-hero-text-subheading-para">
                                    Marked helps you capture ideas, take
                                    structured notes, and stay focused. Create
                                    collections of notes and swiftly format as
                                    you type with Markdown!
                                    <br />
                                    Ready to evolve your notes?
                                </p>
                            </div>

                            <div className="home-hero-text-cta">
                                <div className="home-hero-text-cta-btns">
                                    <Link
                                        className="home-hero-text-cta-btns-btnlink"
                                        to={"/sign-in"}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        className="home-hero-text-cta-btns-btnlink home-hero-text-cta-btns-signuplink"
                                        to={"/sign-up"}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                                <p className="home-hero-text-cta-link">
                                    Not sure yet?{" "}
                                    <a href="#home-howto">See how it works</a>.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="home-howto" className="home-howto">
                        <hr />
                        <div className="home-howto-text">
                            <h2 className="home-howto-text-heading">
                                How It Works
                            </h2>
                            <p className="home-howto-text-para">
                                Create an account to take notes and access them
                                anytime, anywhere!
                            </p>
                            <p className="home-howto-text-para">
                                Add new notes written in Markdown syntax. Click
                                save and see Markdown do its thing!
                            </p>
                            <p className="home-howto-text-para">
                                See a list of all your notes in the left-hand
                                side panel.
                            </p>
                            <p className="home-howto-text-para">
                                Need to adjust your note? Simply click anywhere
                                on it to edit it. If you no longer want your
                                note, just click the delete button.
                            </p>
                            <p className="home-howto-text-para">
                                Optionally create collections to organize your
                                notes. Feel free to rename or delete these
                                collections any time you wish.
                            </p>
                            <p className="home-howto-text-para">
                                New to Markdown?{" "}
                                <a href="#home-learnmd">Learn more</a>.
                            </p>
                        </div>
                        <hr />
                    </section>

                    <section id="home-learnmd" className="home-learnmd">
                        <div className="home-learnmd-container">
                            <figure className="home-learnmd-imagefigure">
                                <img
                                    className="home-learnmd-imagefigure-image"
                                    src="/assets/images/markdown-logo.png"
                                    alt="Markdown Logo"
                                />
                            </figure>

                            <div className="home-learnmd-text">
                                <h2 className="home-learnmd-text-heading">
                                    Markdown Basics
                                </h2>
                                <p className="home-learnmd-text-para">
                                    Markdown is a lightweight markup language
                                    that makes it easy to format plain text.
                                    It's perfect for notes, documentation, and
                                    clean writing without relying on complicated
                                    formatting tools.
                                </p>
                                <p className="home-learnmd-text-para">
                                    With just a few simple symbols, you can
                                    structure content quickly and consistently.
                                    Learn the basics by exploring the{" "}
                                    <a
                                        href="https://www.markdownguide.org/basic-syntax"
                                        target="_blank"
                                    >
                                        official Markdown Guide
                                    </a>
                                    .
                                </p>
                                <p className="home-learnmd-text-para">
                                    For example, use <code>#</code> for
                                    headings, <code>*</code> or <code>-</code>{" "}
                                    for lists, and <code>**bold**</code> or{" "}
                                    <code>*italic*</code> to style text. You can
                                    also create links, images, and even code
                                    blocks using easy-to-remember syntax.
                                </p>
                                <p className="home-learnmd-text-para">
                                    Whether you're writing meeting notes, blog
                                    posts, or personal journals, Markdown helps
                                    keep your writing organized and readable —
                                    one note at a time ✍️
                                </p>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default HomePage;
