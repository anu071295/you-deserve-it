import React from 'react';

import { Link } from 'react-router-dom';

import './homepage.styles.scss';

const HomePage = () => (
    <div className='homepage'>
        <div className = 'options'>
            <Link className='option' to='/signin'>
                SIGN IN
            </Link>
            <Link className='option' to='/signup'>
                SIGN UP
            </Link>
        </div>
    </div>
);

export default HomePage;