import { useEffect } from "react";
import { useState } from "react"
import { getStoredCart } from "../utilities/LocalStorage";


const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);
        console.log(keys);

        fetch('http://localhost:5000/courses/byKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(courses => {
                if (courses.length) {

                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedCourses = courses.find(product => product.key === key);
                        if (addedCourses) {
                            const quantity = savedCart[key];
                            addedCourses.quantity = quantity;
                            storedCart.push(addedCourses)
                        }

                    }
                    setCart(storedCart);
                }
            })

    }, [])

    return [cart, setCart];
}

export default useCart;