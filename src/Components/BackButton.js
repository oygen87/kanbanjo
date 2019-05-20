import React from 'react';

const BackButton = ({props}) => {
    const back = () => {
        props.history.push('/todo');
    };

    return (
        <>
            <button className="btn btn-outline-dark border-0 form-control" onClick={back}>BACK</button>
        </>
    );
};

export default BackButton;