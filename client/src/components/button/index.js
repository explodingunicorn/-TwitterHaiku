import React from 'react';
import './button.style.scss';

const Button = ({type, onClick, children}) => {
    const click = () => {
        onClick();
    }

    return (
        <button className={type}
            onClick={() => click()}>
            {children}
        </button>
    );
}

export default Button;