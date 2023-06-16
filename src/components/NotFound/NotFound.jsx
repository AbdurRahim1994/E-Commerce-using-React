import React from 'react';
import NotFoundImage from '../../assets/image/404.png'

const NotFound = () => {
    return (
        <div>
            <div className='center-screen m-5'>
                <img src={NotFoundImage} height={500} width={800}></img>
            </div>
        </div>
    );
};

export default NotFound;