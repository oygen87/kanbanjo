import React from 'react';

const BackButton = ({props}) => {
    const back = () => {
        props.history.push('/todo');
    };

    return (
        <>
            <button className="btn btn-outline-light border-0 form-control" onClick={back}>back</button>
        </>
    );
};

export default BackButton;