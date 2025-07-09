import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

// export const useAuthContext = ()=>{
//     return useContext(UserContext)
// }

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const updateUser = (userData) => {
        setUser(userData)
    };

    const clearUser = () => {
        setUser(null)
    };
    return (
        < UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }
            }
        >
            {children}
        </UserContext.Provider >
    )
}

export default UserProvider;