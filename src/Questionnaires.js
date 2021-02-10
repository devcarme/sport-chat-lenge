import React, { useEffect, useState }  from "react";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Form, Col, Container, Row, Button } from "react-bootstrap"; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

import globals from "./config/globals";

import QuestionnaireSelect from "./select/QuestionnaireSelect";

function Questionnaires(props){
    const history = useHistory();
    const [idQuestionnaire, setIdQuestionnaire] = useState("");

    const [questionnaires, setQuestionnaires] = useState([]);

    const getAllQuestionnaires = () =>{
        fetch(globals.url+ "getAllQuestionnaires")
            .then(res => res.json())
            .then(res => setQuestionnaires(res))
    };

    const handleChangeQuestionnaire = (event) => {
        setIdQuestionnaire(event.currentTarget.value);
    };

    const handleSubmit = (event) => {
        history.push("questionnaire/"+idQuestionnaire);
    };
    
    useEffect(()=> {
        getAllQuestionnaires();
    },[])

    return(
        <Container className="h-100 mt-5">
            <Row className="h-100 justify-content-center align-items-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlSelect1" className="col-12" >
                    <h3>Choisir un questionnaire</h3>
                        <Form.Control as="select" required value={idQuestionnaire}  onChange={handleChangeQuestionnaire}>
                            <option defaultValue required value="" hidden>Tous les questionnaires</option>
                            {questionnaires.map(questionnaire => (
                                <QuestionnaireSelect
                                key={questionnaire.idQuestionnaire}
                                details={questionnaire}
                                />
                                ))}
                        </Form.Control>
                        <Col>
                            <Button variant="primary btn-block mt-3" type="submit" className="button">Commencer</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    );
}

export default Questionnaires;