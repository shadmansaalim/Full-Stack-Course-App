import React from 'react';
import { createContext } from 'react';
import useCart from '../hooks/useCart';
import useCourses from '../hooks/useCourses';
import useFirebase from '../hooks/useFirebase';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [courses] = useCourses();
    const authContext = useFirebase();
    const cartContext = useCart(courses);
    return (
        <Context.Provider value={[authContext, cartContext]}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;