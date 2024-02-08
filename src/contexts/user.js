import { createContext, useContext, useEffect, useState } from 'react'
import { checkAuth, logoutUser, getUserFromLocalStorage, updateUserLocalStorage } from '../helpers/helpers';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = () => {
    setLoading(true);
    const user = getUserFromLocalStorage();
    checkAuth().then(res => {
      if (!res.isAuth) {
        setUser(null);
        updateUserLocalStorage(null);
      } else {
        setUser(user);
      }
    })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
  }

  useEffect(() => {
    checkAuthStatus();
  }, [])

  const logout = () => {
    setLoading(true);
    logoutUser().then(res => {
      setUser(null);
      updateUserLocalStorage(null);
    }).catch(err => { throw err })
      .finally(() => {
        setUser(null);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
  }

  const login = (user) => {
    setLoading(true);
    setUser(user);
    updateUserLocalStorage(user);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <UserContext.Provider value={{ user, login, logout, checkAuthStatus, loading }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext);

export default useUser;