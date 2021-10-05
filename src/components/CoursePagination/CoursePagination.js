import React, { useState } from 'react';
import './CoursePagination.css'
const Pagination = (props) => {
    //Getting coursesPerPage, totalCourses and paginate function for use
    const { coursesPerPage, totalCourses, paginate } = props;

    //Declaring state for active page for pagination
    const [activePage, setActivePage] = useState(1);

    //Declaring empty array to store how many page will be there on the basis of data
    const pageNumbers = [];
    //Iterating over the page count
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }


    // Styling the active page in pagination by adding the class active
    const btns = document.getElementsByClassName('page-link');
    for (const btn of btns) {
        const li = btn.parentElement;
        if (parseInt(btn.innerHTML) === activePage) {
            li.classList.add('active')
        }
        else if (parseInt(btn.innerHTML) !== activePage) {
            li.classList.remove('active')
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {
                    activePage !== 1 ? <li class="page-item">
                        <button onClick={() => {
                            paginate(activePage - 1)
                            setActivePage(activePage - 1)
                        }} class="page-link">Previous</button>
                    </li>
                        :
                        <li class="page-item disabled">
                            <button class="page-link">Previous</button>
                        </li>

                }
                {

                    pageNumbers.map(number => (
                        number === 1 ?
                            <li key={number} className="page-item active">
                                <button onClick={() => {
                                    setActivePage(number)
                                    paginate(number)
                                }} className="page-link" >
                                    {number}
                                </button>
                            </li>
                            :
                            <li key={number} className="page-item ">
                                <button onClick={() => {
                                    setActivePage(number)
                                    paginate(number)
                                }} className="page-link" >
                                    {number}
                                </button>
                            </li>
                    ))
                }
                {
                    activePage !== (pageNumbers.length) ?
                        <li class="page-item">
                            <button onClick={() => {
                                paginate(activePage + 1)
                                setActivePage(activePage + 1)
                            }} class="page-link">Next</button>
                        </li>
                        :
                        <li class="page-item disabled">
                            <button class="page-link">Next</button>
                        </li>
                }
            </ul>
        </nav>
    );
};

export default Pagination;