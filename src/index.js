import React, { useEffect, useState, Component }  from "react";
import ReactDOM from "react-dom";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap"; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

import globals from "./config/globals";
import logo from "./images/chatsport.png";

import LoginForm from "./form/LoginForm";
import Questionnaires from "./Questionnaires";
import Questionnaire from "./Questionnaire";
import ValidationQuestionnaire from "./ValidationQuestionnaire";

function Content(){
    let history = useHistory();
    
    const [sportifs, setSportifs] = useState([]);
    const [error, setError] = useState("");

    const getAllSportifs = () =>{
        fetch(globals.url+ "getAllSportifs")
            .then(res => res.json())
            .then(res => setSportifs(res))
    };

    function verifySportif (dataSportif) {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(dataSportif)
        };
        
        fetch(globals.url + "verifySportif", requestOptions)
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    history.push("/questionnaires")
                } else{
                    setError(res.error)
                }
            })
    };

    useEffect(()=> {
        getAllSportifs();
    },[])

    return(
        <Container>
            <Row>
                <Col xs={{span: 8, offset: 2}} md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}} lg={{span: 4, offset: 4}} xl={{span: 4, offset: 4}}>
                    <Row className="justify-content-center">
                        <img src={logo} alt="Logo" width="180" height="148"/>
                        {error !== ""  
                            ?  <p className="text-danger">{error}</p> 
                            :  <h2></h2>
                        }
                        <LoginForm onLogin={verifySportif}/>                 
                    </Row>        
                </Col>
            </Row>
        </Container>
    );
}

class Index extends Component{

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Content}/>
                    <Route path="/questionnaires" component={Questionnaires}/>
                    <Route path="/questionnaire/:idQuestionnaire" component={Questionnaire}/>
                    <Route path="/validationQuestionnaire" component={ValidationQuestionnaire}/>
                </Switch>
            </Router>
        )
    };
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);