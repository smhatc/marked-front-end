import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} from "react";
import * as collectionService from "../services/collectionService";

const CollectionContext = createContext(null);

const useCollections = () => {
    const context = useContext(CollectionContext);
    if (!context)
        throw new Error(
            "useCollections must be used within a CollectionsProvider"
        );
    return context;
};

const CollectionsProvider = ({ children }) => {
    const [collections, setCollections] = useState([]);
    const [collection, setCollection] = useState(null);

    // Create
    const handleAddCollection = useCallback(async (collectionFormData) => {
        try {
            const newCollection = await collectionService.createCollection(
                collectionFormData
            );
            setCollections((prev) => [newCollection, ...prev]);
            return { success: true, data: newCollection };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Read All
    const handleIndexCollections = useCallback(async () => {
        try {
            const collectionsData = await collectionService.indexCollections();
            setCollections(collectionsData);
            return { success: true, data: collectionsData };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Read One
    const handleShowCollection = useCallback(async (id) => {
        try {
            const collectionData = await collectionService.showCollection(id);
            setCollection(collectionData);
            return { success: true, data: collectionData };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    // Update
    const handleUpdateCollection = useCallback(
        async (id, collectionFormData) => {
            try {
                const updatedCollection =
                    await collectionService.updateCollection(
                        id,
                        collectionFormData
                    );
                setCollections((prev) =>
                    prev.map((n) =>
                        n.id === updatedCollection.id ? updatedCollection : n
                    )
                );
                if (collection?.id === updatedCollection.id)
                    setCollection(updatedCollection);
                return { success: true, data: updatedCollection };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message };
            }
        },
        []
    );

    // Delete
    const handleDeleteCollection = useCallback(async (id) => {
        try {
            await collectionService.deleteCollection(id);
            setCollections((prev) => prev.filter((n) => n.id !== id));
            if (collection?.id === id) setCollection(null);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }, []);

    const value = useMemo(
        () => ({
            collections,
            collection,
            handleAddCollection,
            handleIndexCollections,
            handleShowCollection,
            handleUpdateCollection,
            handleDeleteCollection,
        }),
        [
            collections,
            collection,
            handleAddCollection,
            handleIndexCollections,
            handleShowCollection,
            handleUpdateCollection,
            handleDeleteCollection,
        ]
    );

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    );
};

export { useCollections, CollectionsProvider };
