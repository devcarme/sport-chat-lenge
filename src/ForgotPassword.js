import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, ButtonGroup } from "bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Icon, InlineIcon } from '@iconify/react';
import okIcon from '@iconify/icons-flat-color-icons/ok';

import "./css/main.css";
import globals from "./config/globals";


function ForgotPassword (props) {
  const history = useHistory();

  const handleClickButton = () =>{
      history.push("/questionnaires");
  };

  return (
    <div className="container">
      <div className="row flex-column mt-5">
        <div className="col-4 align-self-center text-center">
          <h1>Mot de passe oublié ?</h1>
          <h2>Contacter le support : ducarmeloick@gmail.com</h2>
          <Icon icon={okIcon} style={{"font-size":40}} className="mt-5"/>
          <Form onSubmit={handleClickButton} className="mt-5">
            <Button variant="primary" type="submit">Se connecter</Button>
          </Form>
        </div>
      </div>
    </div>
  );  
}

export default ForgotPassword;