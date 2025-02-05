import React from 'react';



const ZelleElements = ({ methodData }) => {
    return (
        <>
            <div className="" dangerouslySetInnerHTML={{ __html: methodData?.getSpecifications.email }}>
            </div>
        </>
    );
}

export default ZelleElements;