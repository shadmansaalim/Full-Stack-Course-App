import React, { useState } from 'react';

const Pagination = (props) => {
    //Getting coursesPerPage, totalCourses and paginate function for use
    const { coursesPerPage, totalCourses, paginate } = props;

    //Declaring empty array to store how many page will be there on the basis of data
    const pageNumbers = [];
    //Iterating over the page count
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    const [activePage, setActivePage] = useState(1);
    return (
        <nav>
            <ul className="pagination">
                <li class="page-item">
                    <button onClick={() => {
                        if (activePage !== 1) {
                            paginate(activePage - 1)
                            setActivePage(activePage - 1)
                        }
                    }} class="page-link">Previous</button>
                </li>
                {

                    pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => {
                                setActivePage(number)
                                paginate(number)
                            }} className="page-link" >
                                {number}
                            </button>
                        </li>
                    ))
                }
                <li class="page-item">
                    <button onClick={() => {
                        if (activePage !== (pageNumbers.length)) {
                            paginate(activePage + 1)
                            setActivePage(activePage + 1)
                        }
                    }} class="page-link">Next</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;