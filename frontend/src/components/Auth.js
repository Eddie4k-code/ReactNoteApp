import React, { useState } from 'react';
import { AuthActions, authActions } from '../store/index.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';




function Auth() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password:""
    })


    const [isSignup, setIsSignup] = useState(false);



    //Will display an error message if user enters incorrect information to login.
    const [isMsg, setMsg] = useState();




    const handleChange = (e) => {               //This is where we set the inputs to the items types into the input boxes
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    };





    const sendRequest = async (type = 'signup') => {


        const res = await axios.post(`http://localhost:5000/api/auth/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err => setMsg(err.response.data.msg)); //Setting the isMsg to the error msg


        const data = await res.data;
        console.log(isMsg);
        console.log(data);
        return data;
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then((data) => dispatch(AuthActions.login))
                .then((data) => console.log(data.email))
                .then(() => navigate('/'));
                


        }


        if (!isSignup) {

            sendRequest('login')
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => navigate('/'));
                

        } 


        
    }





    return (
        
        <div className="form-control form-control-sm" onSubmit={handleSubmit}>
            <form method="POST">
                <label className="login-label"> {isSignup ? "Signup" : "Login"} </label>
  
                {isSignup && <input name="name" onChange={handleChange} placeholder="name" className="text-field" type="text" />}
                <input name="email" onChange={handleChange} placeholder="email" className="text-field" type="email" />
                <input name="password" onChange={handleChange} placeholder="password" className="text-field" type="password" />

                

                <button type="submit" className="btn btn-primary">{isSignup ? "Signup" : "Login"}</button>

                

                <h6>{isMsg}</h6>
                
                


            </form>

            <button onClick={() => setIsSignup(!isSignup)}>
                Change To {isSignup ? "Login" : "Signup"}
                
            </button>
            </div>
      

        
       
    );
}


export default Auth;
