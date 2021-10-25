// use local storage as your db for now
const addToDb = id => {
    const exists = getDb();
    let course_cart = {};
    if (!exists) {
        course_cart[id] = 1;
    }
    else {
        course_cart = JSON.parse(exists);
        course_cart[id] = 1;

    }
    updateDb(course_cart);
}

const getDb = () => localStorage.getItem('course_cart');
const updateDb = cart => {
    localStorage.setItem('course_cart', JSON.stringify(cart));
}

const removeFromDb = id => {
    const exists = getDb();
    if (!exists) {

    }
    else {
        const course_cart = JSON.parse(exists);
        delete course_cart[id];
        updateDb(course_cart);
    }
}

const getStoredCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
    localStorage.removeItem('course_cart');
}

export { addToDb, removeFromDb as deleteFromDb, clearTheCart, getStoredCart }
