import { useContext } from "react"
import { Context } from '../context/ContextProvider'

const useCartContext = () => {
    return useContext(Context)[1];
}

export default useCartContext;