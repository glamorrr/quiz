import { createContext, useState, useContext } from 'react';
import USER from '../USER';
import useLocalStorage from './useLocalStorage';

let AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [userInLocalStorage, setUserInLocalStorage] = useLocalStorage('user', null);
    let [user, setUser] = useState(userInLocalStorage);

    let signin = ({ email, password }) => {
        if (email !== USER.email || password !== USER.password) {
            throw new Error('Invalid credentials');
        }

        setUserInLocalStorage({ email });
        setUser({ email });
    };

    let signout = () => {
        setUserInLocalStorage(null);
        setUser(null);
    };

    const value = { user, signin, signout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };
