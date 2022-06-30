import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AddNote from './AddNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayNotes from './DisplayNotes';



function Dashboard() {

    

    const navigate = useNavigate();

    const [isFormShow, setIsFormShow] = useState(false);


    //If user is not logged in then redirect to login page, so they cannot access this page.
    useEffect(() => {
        let id = localStorage.getItem("userId");

        if (!id) {
            
            navigate('/auth');
            
        }
    });


    const showForm = () => {
        setIsFormShow(!isFormShow)
        console.log(isFormShow);
    }



    return (
        <div>


            <button onClick={showForm}>Add Note</button>

            {isFormShow && <AddNote />}


            <div>
                <DisplayNotes />
            </div>


        </div>
        
        )
}

export default Dashboard;