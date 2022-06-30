import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../store';


function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(AuthActions.logout())

        console.log('Worked')

        
    }


    

    


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Eddie Note List with Auth</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

             
               
                    <li className="nav-item">
                        {!localStorage.getItem("userId") && <Link to="/auth" className="nav-link">Login</Link>}
                        
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>

                    <li className="nav-item">
                        {localStorage.getItem("userId") && <Link to="/logout" className="nav-link"><button onClick={logout}>Logout</button></Link>}
                    </li>


                </ul>
            </div>
        </nav>
        
        );
}


export default Nav;