import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { courseID } = useParams();
    return (
        <div>
            <h1>Course ID : {courseID}</h1>
        </div>
    );
};

export default CourseDetails;