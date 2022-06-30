import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




//Form

function AddNote() {

    const navigate = useNavigate();


    const id = localStorage.getItem("userId");



    const [notes, setNotes] = useState({
        title: "",
        content: "",
    });


    const handleChange = (e) => {
        setNotes((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(data => console.log(data))
            
            


    }


    //Send request to add note
    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/notes/add', {
            title: notes.title,
            content: notes.content,
            user: id,
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;
    }


    return (

        <div className="form-control">
            <form method="POST" onSubmit={handleSubmit}>
                <label className="login-label"> Add Note </label>

                <input name="title" onChange={handleChange} value={notes.title} placeholder="title" className="text-field" type="text" />
                <input name="content" onChange={handleChange} value={notes.content} placeholder="content" className="text-field" type="text" />

               


                <button type="submit" className="btn btn-warning">Submit</button>





            </form>

     

           
        </div>




    );
}


export default AddNote;
