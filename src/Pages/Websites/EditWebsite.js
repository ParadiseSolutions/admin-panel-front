
import React, { useState, useEffect } from "react";
import { getWebsite } from "../../Utils/API/Websites";
import { useParams } from "react-router-dom";

const NewWebsite = () => {
    const { id } = useParams();

    //get website information
    const [websiteData, setDataWebsite] = useState([]);
    useEffect (() =>{
        getWebsite(id).then((resp) => {
            setDataWebsite(resp.data.data);
        });
    }, [id]);

    console.table(websiteData)
    return(
        <>
            <h1>DVGHKVBJ</h1>
        </>
    )
     
}
 
export default NewWebsite;