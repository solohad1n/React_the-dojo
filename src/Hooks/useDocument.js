import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../firebase/config"

export const useDocument = async (collectionName, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const docRef = doc(firestore, collectionName, id)

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        setDocument(snap.data())
        setError(null)
      },
      (err) => {
        setError(err)
        setDocument(null)
      }
    )
    return () => unsubscribe()
  }, [collectionName, id])
  return { document, error }
}