import React from 'react';
import './Menu.css'
import { useHistory } from "react-router-dom";

export default function Login () {

    const history = useHistory()
    
    return(
        <div className='menu'>
            <span className='menu-item' onClick={() => history.push('/')}>Home</span>
            <span className='menu-item' onClick={() => history.push('/trash')}>Trash</span>
        </div>
    )
}