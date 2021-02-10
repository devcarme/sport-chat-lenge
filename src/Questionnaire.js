import React, { Component } from "react";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Row, Col, Button, ButtonGroup, Form } from "react-bootstrap";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Icon, InlineIcon } from '@iconify/react';
import bxsRightArrow from '@iconify/icons-bx/bxs-right-arrow';
import bxsLeftArrow from '@iconify/icons-bx/bxs-left-arrow';

import globals from "./config/globals";

import Question from "./Question";
import { Carousel } from 'react-responsive-carousel';



class Questionnaire extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      idQuestionnaire: 0,
      questionsNumber: 0,
      questions: [],
      questionnaire: [],
      index: 1,
      responses: new Map(),
      error:"",
      isAlreadyAnswered: false,
      indexResponse: 0,
      idResponsesQuestions: null
    };
  }

  isAlreadyAnswered = (questionnaire) => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({idQuestionnaire: questionnaire})
    };
    
    fetch(globals.url + "isAlreadyAnswered", requestOptions)
      .then(res => res.json())
      .then(res => this.setState({isAlreadyAnswered: res.ok}))
  };

  addResponse = (arrayResponse) => {
    let trouve = 0;
    let responsesTmp = new Map();
    responsesTmp = this.state.responses;
    responsesTmp.set(arrayResponse.idQuestion, arrayResponse.response);
    this.setState({responses: responsesTmp});
  }

  handleClickCancel = () => {
   const { history } = this.props;
   if(history) history.push('/questionnaires');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    let mapResponses = new Map();
    mapResponses = this.state.responses;
    mapResponses.set("idQuestionnaire", this.state.idQuestionnaire);
    let objArrayResponses = Object.fromEntries(mapResponses);

    console.log(JSON.stringify(objArrayResponses));

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(objArrayResponses)
    };
    
    fetch(globals.url + "sendResponses", requestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.ok){
          history.push("/validationQuestionnaire");
        }
      }) 
      .catch(error => {
        console.log("Erreur :", error)
      });
  };

  getQuestions(questionnaire){
    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({idQuestionnaire: questionnaire})
    };
  
    fetch(globals.url + "getQuestionsByQuestionnaire", requestOptions)
      .then(res => res.json())
      .then(res => this.setState({questions: res}))
  }

  getQuestionnaire(questionnaire){
    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({idQuestionnaire: questionnaire})
    };
  
    fetch(globals.url + "getQuestionnaire", requestOptions)
      .then(res => res.json())
      .then(res => this.setState({questionnaire: res}))
  }

  getQuestionsNumber(questionnaire){
    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({idQuestionnaire: questionnaire})
    };
  
    fetch(globals.url + "getQuestionsNumber", requestOptions)
      .then(res => res.json())
      .then(res => this.setState({questionsNumber: res.questionsNumber}))
  }

  getResponsesQuestions(questionnaire){
    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({idQuestionnaire: questionnaire})
    };
  
    fetch(globals.url + "getResponsesQuestions", requestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.ok){
          this.setState({idResponsesQuestions: res.idResponsesQuestions})
        }
      })
  }


  componentDidMount(){
    const { match: { params } } = this.props;
    this.setState({idQuestionnaire: params.idQuestionnaire});
    this.getResponsesQuestions(params.idQuestionnaire);
    this.getQuestions(params.idQuestionnaire);
    this.getQuestionnaire(params.idQuestionnaire);
    this.getQuestionsNumber(params.idQuestionnaire);
    this.isAlreadyAnswered(params.idQuestionnaire);
  }

  render() {
    const arrowStyles: CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
        color:"yellow"
    };

    const indicatorStyles: CSSProperties = {
        backgroundColor: "white",
        color: "yellow",
        width: 8,
        height: 8,
        display: 'inline-block',
        margin: '0 8px',
    };

    return (
      <div className="container" style={{ backgroundColor: "white", padding: 20, height: 150 }}>
        <div className="row justify-content-center">
          <h1>Questionnaire {this.state.questionnaire.map(question => question.nomQuestionnaire)}</h1>
          <Form onSubmit={this.handleSubmit}>
            <Carousel 
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15, backgroundColor:"transparent", border:0 }}>
                    <Icon icon={bxsLeftArrow} style={{color: '#FED018', fontSize: '35px', filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                      <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15, backgroundColor:"transparent", border:0 }}>
                          <Icon icon={bxsRightArrow} style={{color: '#FED018', fontSize: '35px', filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                      </button>
                  )
              }
              statusFormatter={(current, total) => ``}

              renderIndicator={(onClickHandler, isSelected, index, label) => {
                      if (isSelected) {
                          return (
                              <li
                                  style={{ ...indicatorStyles, background: 'white' }}
                                  aria-label={`Selected: ${label} ${index + 1}`}
                                  title={`Selected: ${label} ${index + 1}`}
                              />
                          );
                      }
                      return (
                          <li
                              style={indicatorStyles}
                              onClick={onClickHandler}
                              onKeyDown={onClickHandler}
                              value={index}
                              key={index}
                              role="button"
                              tabIndex={0}
                              title={`${label} ${index + 1}`}
                              aria-label={`${label} ${index + 1}`}
                          />
                      );
                  }}
              >
              {this.state.questions.map(question => (
              <div>
                <Question 
                  key={question.idQuestion} 
                  details={question}
                  onChangeRadio={this.addResponse}
                  idResponsesQuestions={this.state.idResponsesQuestions}
                  isAlreadyAnswered={this.state.isAlreadyAnswered}
                />
              </div>
              ))}
            </Carousel>
            {this.state.error !== ""
              ? <h2>{this.state.error}</h2>
              : <h2></h2>
            }
            <Button variant="secondary" style={{float:"right"}} onClick={this.handleClickCancel}>Annuler</Button>
            {this.state.responses.size === this.state.questionsNumber && !this.state.isAlreadyAnswered 
              ?<Button variant="primary mr-5" type="submit" className="button" style={{float:"right"}}>Envoyer</Button>
              :<Button variant="primary mr-5" type="submit" className="button" style={{float:"right", display:"none"}}>Envoyer</Button>
            }
            
        </Form>
        </div>
      </div>
    );
  }
}

export default Questionnaire;