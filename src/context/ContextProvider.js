import React from 'react';
import { createContext } from 'react';
import useCart from '../hooks/useCart';
import useFirebase from '../hooks/useFirebase';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const authContext = useFirebase();
    const cartContext = useCart();
    return (
        <Context.Provider value={[authContext, cartContext]}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;