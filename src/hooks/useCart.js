import { useEffect } from "react";
import { useState } from "react"
import { getStoredCart } from "../utilities/LocalStorage";


const useCart = (courses) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {

        if (courses.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const id in savedCart) {
                const addedCourse = courses.find(product => product._id === id);
                if (addedCourse) {
                    // set quantity
                    const quantity = savedCart[id];
                    addedCourse.quantity = quantity;
                    storedCart.push(addedCourse);
                }
            }
            setCart(storedCart);
        }

    }, [courses]);

    return [cart, setCart];
}

export default useCart;