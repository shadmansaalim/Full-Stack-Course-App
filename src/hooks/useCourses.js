import { useEffect } from "react";
import { useState } from "react";


const useCourses = () => {
    // Declaring the state
    const [courses, setCourses] = useState([]);

    // fetching data from JSON file
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);
    return [courses, setCourses];
}

export default useCourses;