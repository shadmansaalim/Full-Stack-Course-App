import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Rating from 'react-rating';
import { useState } from 'react';
import swal from 'sweetalert';

const AddReview = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [value, setValue] = useState(0);

    const onSubmit = data => {
        data.photoURL = user.photoURL;
        data.rating = value;
        fetch('https://stormy-taiga-36853.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    swal("Thank you for your feedback", "We have added your feedback on our landing page", "success");
                    reset();
                }
            })

    }




    return (
        <div className="vh-100" >
            <div className="col-lg-6 mx-auto shadow-lg p-3 mt-5 rounded-3">
                <div className="card-body mx-md-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>Please enter your feedback here</p>
                        <div className="form-floating mb-3">
                            <input defaultValue={user?.displayName} type="text" className="form-control" id="floatingServiceName" placeholder="name@example.com" required  {...register("name")} />
                            <label htmlFor="floatingServiceName"><small>Your Name</small></label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingServiceDescription" style={{ height: '100px' }} {...register("feedback")}></textarea>
                            <label htmlFor="floatingServiceDescription">Feedback</label>
                        </div>
                        <div className="text-start">
                            <Rating
                                className="fs-3"
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                fractions={2}
                                value={value}
                                onChange={(value) => {
                                    setValue(value);
                                }}
                            ></Rating>
                        </div>
                        <div className="text-end mt-4">
                            <button className="btn btn-outline-primary btn-block mb-3" type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddReview;