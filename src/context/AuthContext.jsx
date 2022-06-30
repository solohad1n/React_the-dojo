import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from '../firebase/config'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_READY': {
      return { ...state, user: action.payload, isReady: true };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isReady: false
  });

  useEffect(() => {
    const cancel = onAuthStateChanged(auth, (_user) => {
      dispatch({ type: 'AUTH_READY', payload: _user })
    })
    return () => cancel();
  }, [])

  return (

    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}