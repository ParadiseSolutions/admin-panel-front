
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWebsite } from "../../Utils/API/Websites";
import { editWebsite, getWebsite } from "../../Utils/API/Websites";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const NewWebsite = () => {
    const dispatch = useDispatch();
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