import { useEffect } from "react";
import { useState } from "react"
import { getStoredCart, cartItemCount } from "../utilities/LocalStorage";


const useCart = () => {
    const [cart, setCart] = useState([]);


    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);


        fetch('https://gory-ghoul-93342.herokuapp.com/byKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(courses => {
                if (courses?.length) {
                    const storedCart = [];
                    for (const id in savedCart) {
                        const addedCourse = courses.find(course => (course.courseID) === (id));
                        if (addedCourse) {
                            // set quantity
                            const quantity = savedCart[id];
                            addedCourse.quantity = quantity;
                            storedCart.push(addedCourse);
                        }
                    }
                    setCart(storedCart);
                }
            })

    }, [])

    return [cart, setCart];
}

export default useCart;