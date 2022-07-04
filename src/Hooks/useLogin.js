import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      const usersRef = doc(firestore, 'users', user.uid)

      await setDoc(usersRef, { isOnline: true }, { merge: true })
      await dispatch({ type: 'LOGIN', payload: user })

      setIsCanlled(false);
      setError(null);
      return user
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}