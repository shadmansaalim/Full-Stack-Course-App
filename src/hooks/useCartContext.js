import { useContext } from "react"
import { Context } from '../context/ContextProvider'

const useCartContext = () => {
    const [authContext, cartContext] = useContext(Context);
    return cartContext;
}

export default useCartContext;