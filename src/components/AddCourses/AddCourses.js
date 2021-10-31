import React from 'react';
import { useForm } from "react-hook-form";
import './AddCourses.css'

const AddCourses = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        fetch('https://gory-ghoul-93342.herokuapp.com/courses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Course Added Successfully')
                }
            })
    }


    return (
        <div className="add-service">
            <h2>Please Add a Course</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Your Name" />
                <textarea {...register("description")} placeholder="Description" />
                <input type="number" {...register("price")} placeholder="Price" />
                <input {...register("img")} placeholder="Image" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddCourses;