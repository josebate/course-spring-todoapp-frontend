import {createContext, useContext, useState} from "react";
import {executeBasicAuthenticationService, executeJwtAuthenticationService} from "../api/AuthenticationApiService";
import {apiClient} from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // Basic auth login function
    // async function login(username, password){
    //
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
    //
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)
    //
    //         if (response.status===200) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)
    //
    //             // Add authorizaiton header to the request configuraiton. Every api call will have the auth token in the header
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('interception and adding a token')
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )
    //
    //             return true
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch(error){
    //         logout()
    //         return false
    //     }
    //
    // }

    // JWT Login function
    async function login(username, password){

        try{
            const response = await executeJwtAuthenticationService(username, password)

            if (response.status===200) {
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken);

                // Add authorizaiton header to the request configuraiton.
                // This way, every api call will have the auth token in the header
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('interception and adding a token')
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch(error){
            logout()
            return false
        }

    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}