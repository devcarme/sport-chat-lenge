import React, { Component }  from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";

class LoginForm extends Component{
    state={
        pseudo:"",
        password:"",
        error:""
    }

    handleForgotPassword = () =>{
        const { history } = this.props;
        history.push("/forgotPassword");
    }

    handleChangePseudo = (event) => {
        this.setState({pseudo: event.currentTarget.value});
    };
    
    handleChangePassword = (event) => {
        this.setState({password: event.currentTarget.value});
    };

    handleSubmit = (event) =>{
        event.preventDefault();
        var pseudo = this.state.pseudo;
        var password = this.state.password;
        this.props.onLogin({pseudo, password});
    };
    

    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Pseudo" required value={this.state.pseudo} onChange={this.handleChangePseudo} autoComplete="on" />
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Mot de passe" required value={this.state.password} onChange={this.handleChangePassword} autoComplete="on" />
                    </Form.Group>
                    <Row>   
                        <Col xs={{span: 8, offset: 2}} md={{span: 8, offset: 2}} sm={{span: 8, offset: 2}} lg={{span: 9, offset: 2}} xl={{span: 8, offset: 2}}>
                            <Button variant="primary btn-block" type="submit" className="button" >
                                Connexion
                            </Button>
                            <h1><a onClick={this.handleForgotPassword()}>Mot de passe oublié ?</a></h1>
                        </Col>
                    </Row>
                </Form>
            </div>            
        )
    };
}

export default LoginForm;