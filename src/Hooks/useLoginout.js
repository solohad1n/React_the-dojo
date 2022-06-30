import { signOut } from "firebase/auth";
import { doc, Firestore, setDoc } from "firebase/firestore";
import { useState } from "react"
import { auth, firestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useLoginout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)
    try {
      const usersRef = doc(Firestore, 'users', user.uid);
      await setDoc(
        usersRef,
        {
          isOnline: false,
        },
        { merge: true }
      );
      await signOut(auth)

      dispatch({ type: 'LOGOUT' })

      setIsPending(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }
  return { logout, error, isPending }
}