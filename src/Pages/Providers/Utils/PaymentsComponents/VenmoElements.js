import React from 'react';



const VenmoElements = ({ methodData }) => {
    return (
        <>
            <div className="" dangerouslySetInnerHTML={{ __html: methodData?.getSpecifications.email }}>
            </div>
        </>
    );
}

export default VenmoElements;