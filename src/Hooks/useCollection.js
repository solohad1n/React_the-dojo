import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { firestore } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING': {
      return {
        document: null,
        isPending: true,
        error: null,
        success: null,
      }
    }
    case 'ADDED_DOCUMENT': {
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      }
    }
    case 'ERROR': {
      return { document: null, error: action.payload, isPending: false, success: false };
    }
    case 'UPDATED_DOCUMENT': {
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: false
      };
    }
    default:
      return state;
  }
}

export const useCollection = (collectionName) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState)

  const collectionRef = collection(firestore, collectionName)


  const addDocument = async (newDocument) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const addedDoc = await addDoc(collectionRef, {
        ...newDocument,
        createdAt: serverTimestamp(),
      })
      dispatch({ type: 'ADDED_DOCUMENT', payload: addedDoc })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
    }
  }


  const updateDocument = async (docId, newDate) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const updatedDoc = await setDoc(
        doc(firestore, 'projects', docId),
        newDate, { merge: true }
      );
      dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDoc })
      return updateDoc
    }
    catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  const deletedDocument = async (docId) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      await deleteDoc(doc(firestore, collectionName, docId))
      dispatch({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, isCancelled, response, updateDocument, deletedDocument }
}

export const useGetCollection = (collectionName, options) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = query(
      collection(firestore, collectionName)
    )

    const unsubscribe = onSnapshot(collectionRef, (snap) => {
      let results = []

      snap.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results)
      setError(null)
    })
    return () => {
      unsubscribe()
    }
  }, [collectionName, options])
  return { documents, error }
}