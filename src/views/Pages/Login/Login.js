import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { getData } from '../../../services';
// or
// import  * as RequestAPI from '../../../services';
const FormErrors = ({formErrors}) => {
  return (
    <div className="form-errors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          )
        } else {
          return <p key={i}>{fieldName}</p>;
        }
      })}
    </div>
  )

  // return (
  //   <div>
  //     <span>{JSON.stringify(formErrors)}</span>
  //     <p>Error elements!</p>
  //   </div>
  // )

}
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: ''
      },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  redirectToRegister = () => {
    this.props.history.push('/register');
  }

  loginApi = () => {
    if (this.state.email && this.state.password) {
      const url = 'https://api.github.com/users/huyvoxuan8489';

      getData(url)
        .then((data) => {
          console.log('resssss', data);
        })
        .catch((error) => {
          console.log('request failed', error);
        });
    }
  }

  onBlur = (event) => {
    this.setState({
      email: event.target.value
    });
  }
  handleUserInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState({
        [fieldName]: fieldValue
      },
      () => { this.validateField(fieldName, fieldValue);
    });
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 2;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
      <span> Hello: {this.props.email}</span>
        <Container>
          <Row className="justify-content-center">
          <FormErrors formErrors={this.state.formErrors}></FormErrors>
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" placeholder="Email" onBlur={this.onBlur} onChange={(event) => this.handleUserInput(event)}/>
                    </InputGroup>
                    <p>You typed: <code>{this.state.email}</code></p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password" onChange={(event) => this.handleUserInput(event)}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        {/* <Button color="primary" className="px-4" onClick={() => this.loginApi()} disabled={!this.state.formValid}>Login</Button> */}
                        <Button color="primary" className="px-4" type="submit" disabled={!this.state.formValid} onClick={() => this.loginApi()}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                      <Button color="primary" className="mt-3" active onClick={() => this.redirectToRegister()}>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.defaultProps = {
  email: 'huy'
};
export default Login;
