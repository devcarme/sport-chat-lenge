import React, { Component, useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from "bootstrap";
import { Form } from "react-bootstrap";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./css/main.css";
import globals from "./config/globals";


function Question (props) {

  const [response, setResponse] = useState(null);
  const [details, idReponsesQuestions] = props;

  const handleChange = (event) =>{
      var arrayResponse = {idQuestion: props.details.idQuestion, response: event.currentTarget.value}
      props.onChangeRadio(arrayResponse);
  };

  const handleCheckYes = (event) =>{
    if(props.isAlreadyAnswered){
      event.preventDefault();
    }else{
      document.getElementById(`custom-radio-1${props.details.idQuestion}`).checked = true;
      document.getElementById(`custom-radio-2${props.details.idQuestion}`).checked = false;
      handleChange(event);
    }
  };

  const handleCheckNo = (event) =>{
    if(props.isAlreadyAnswered){
      event.preventDefault();
    }else{
      document.getElementById(`custom-radio-2${props.details.idQuestion}`).checked = true;
      document.getElementById(`custom-radio-1${props.details.idQuestion}`).checked = false;
      handleChange(event);
    }
  };

  const getResponse = () => {
    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({idQuestion: props.details.idQuestion, idResponsesQuestions: idReponsesQuestions})
    };
  
    fetch(globals.url + "getResponse", requestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.ok){
          setResponse(res.reponse)
          if(res.reponse === 1){
            document.getElementById(`custom-radio-1${props.details.idQuestion}`).checked = true;
          } else if(res.reponse === 0){
            document.getElementById(`custom-radio-2${props.details.idQuestion}`).checked = true;
          }
        }
      })
  };

  useEffect(()=> {
    getResponse();
  },[])

  return (
    <div className="container" style={{ backgroundColor: "white", padding: 20, height: 150 }}>
      <h2>{props.details.texteQuestion}</h2>
      <div className="row justify-content-center">
        <div className="form-check">
          <input onClick={handleCheckYes} className="form-check-input" type="radio" name={`radio-group${props.details.idQuestion}`} id={`custom-radio-1${props.details.idQuestion}`} value="1"
          />
          <label className="form-check-label" for={`custom-radio-1${props.details.idQuestion}`}>
            Oui
          </label>
        </div>
        <div className="form-check ml-5">
          <input onClick={handleCheckNo} class="form-check-input" type="radio" name={`radio-group${props.details.idQuestion}`} id={`custom-radio-2${props.details.idQuestion}`} value="0" />
          <label className="form-check-label" for={`custom-radio-2${props.details.idQuestion}`}>
            Non
          </label>
        </div>
      </div>
    </div>
  );  
}

export default Question;