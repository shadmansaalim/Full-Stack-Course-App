import { useEffect } from "react";
import { useState } from "react";


const useCourses = () => {
    // Declaring the state
    const [courses, setCourses] = useState([]);

    // FETCHING DATA FROM DATABASE BACKEND
    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCourses(data)
            })

    }, []);


    return [courses, setCourses];
}

export default useCourses;