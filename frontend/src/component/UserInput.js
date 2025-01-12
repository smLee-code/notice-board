import React from 'react';

const UserInput = (props) => {
    return (
        <input
            className="userInput"
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            size={props.size}
        />
    );
};

export default UserInput;