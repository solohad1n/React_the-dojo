import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { firestore } from "../Firebase/config";

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
    default:
      return state;
  }
}

export const useCollection = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState)

  const collectionRef = collection(firestore, 'transactions')


  const addDocument = async (newDocument) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const addedDoc = await addDoc(collectionRef, newDocument)
      dispatch({ type: 'ADDED_DOCUMENT', payload: addedDoc })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
    }
  }

  const deleteDocument = () => {

  };

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, isCancelled, response }
}

export const getCollection = (collectionName) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(firestore, collectionName)

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
  }, [collection])
  return { documents, error }
}