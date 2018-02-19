import React from 'react';
import './button.style.scss';

const Button = ({type, children}) => {
    return (
        <button className={type}>{children}</button>
    );
}

export default Button;