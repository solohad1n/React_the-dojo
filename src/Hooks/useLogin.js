import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from '../Firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCanlled] = useState(false)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      dispatch({ type: 'LOGIN', payload: user })

      if (!isCancelled) {
        setIsCanlled(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  useEffect(() => {
    return () => setIsCanlled(true)
  }, [])

  return { login, isPending, error }
}