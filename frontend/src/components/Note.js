import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Note = ({ title, content, id }) => {


    const navigate = useNavigate();

    console.log(id);

    const style = {
        width: '18rem'
    }


    

    const deleteRequest = async (e) => {
        const res = await axios.delete(`http://localhost:5000/api/notes/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
        
    }


    const handleDelete = () => {
        deleteRequest().then((data) => console.log(data));
    }




    return (

        <div className="container">

            <div className="card" style={style} >
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{content}</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>


        </div>

        
        );

};



export default Note;