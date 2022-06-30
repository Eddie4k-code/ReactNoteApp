import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Note from './Note';


function DisplayNotes() {






    const [notes, setNotes] = useState();

    const id = localStorage.getItem("userId")



    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:5000/api/notes/user/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }



    //If user is not logged in then redirect to login page, so they cannot access this page.
    useEffect(() => {

        sendRequest().then(data => setNotes(data.notes.notes));
        
        
    });


    



    return (
        <div>
            <div>
                {notes && Object.values(notes).map((note, index) => (   //Mapping blog for each blog in DB
                    <Note
                         //This is to check if the user id local storage is equal to the user id of the blog so we know they can edit it its always set to true here because this page only shows their blogs
                        title={note.title}
                        content={note.content}
                        id={note._id}
                    />
                ))}
            </div>
        </div>

    )
}

export default DisplayNotes;