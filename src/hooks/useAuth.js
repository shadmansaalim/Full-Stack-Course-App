import { useContext } from "react"
import { Context } from '../context/ContextProvider'

const useAuth = () => {
    return useContext(Context)[0];
}

export default useAuth;