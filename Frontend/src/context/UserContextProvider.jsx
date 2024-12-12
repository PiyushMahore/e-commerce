import axios from "axios";
import { createContext, useContext, useState } from "react";

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    const signUp = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:9000/api/v1/user/signup', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log("Failed To SignUp")
        };
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:9000/api/v1/user/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log("Failed To SignUp")
        };
    }

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/v1/user/current-user', { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log("Failed To get Current User")
        }
    }

    const logOut = async () => {
        try {
            const response = await axios.patch('http://localhost:9000/api/v1/user/logout', {}, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log("Failed to logOut")
        }
    }

    return (
        <UserContext.Provider value={{ user, signUp, login, getCurrentUser, logOut, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext)

export { UserContextProvider, useUser }