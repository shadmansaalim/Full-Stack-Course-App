import { useEffect } from "react";
import { useState } from "react";


const useCourses = () => {
    // Declaring the state
    const [courses, setCourses] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const size = 8;

    // FETCHING DATA FROM DATABASE BACKEND
    useEffect(() => {
        fetch(`https://course-app-backend.onrender.com/courses?page=${activePage}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.courses)
                const count = data.count;
                //Using math.ceil to get accurate pages for pagination and dividing by 8 to keep 8 courses per page
                const pageNumber = Math.ceil(count / 8);
                setPageCount(pageNumber);
            })

    }, [activePage]);


    return [courses, setCourses, pageCount, activePage, setActivePage];
}

export default useCourses;