import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { getUser } from "./db/apiAuth";

const urlContext = createContext();

const urlProvider = ({ children }) => {

  const {data:user,loading, fn:fetchUser}  = useFetch(getUser)

  const isAuthenticated = user?.role === "authenticated"
  useEffect(() =>{
    fetchUser()
  },[])

  return <urlContext.Provider value={{user,fetchUser,loading,isAuthenticated}}>{children}</urlContext.Provider>;
};

export const urlState =()=>{
    return useContext(urlContext)
}
export default urlProvider