import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import harambe from '../assets/harambe.png';
import LOGIN from '../mutations/login';
import SIGNUP from '../mutations/signup';
import { useMutation } from '@apollo/react-hooks';

const errors = [
  'You are no barback...',
  'Harambacks only...',
  'Keep trying...',
  'Just stop trying to guess a password Bandana Dan?',
];

const StyledLogin = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: ${props => props.theme.darkestBlue};
  font-family: ${props => props.theme.font};
  .formDiv {
    width: 90%;
    display: flex;
    flex-direction: column;
  }
  .inputField {
    margin: 5px 0;
  }
  .loginCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 35px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-bottom: 20px;
  }
  .harambacksHeader {
    font-size: 40px;
    font-weight: bold;
  }

  .button {
    margin: 17px 0 5px 0;
    font-size: 18px;
    border: none;
    background-color: ${props => props.theme.darkestBlue};
    padding: 9px 16px;
    letter-spacing: 0.2px;
    color: #ffffff;
    border-radius: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
  .errorDiv {
    color: red;
    font-size: 14px;
  }
  .buttonDiv {
    /* align-self: center; */
    text-align: center;
  }
  .smallerButton {
    margin: 17px 0 5px 0;
    width: 50%;
    align-self: center;
    font-size: 12px;
    border: none;
    background-color: ${props => props.theme.darkestBlue};
    padding: 4px 10px;
    letter-spacing: 0.2px;
    color: #ffffff;
    border-radius: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Login = withRouter(({ history }) => {
  if (localStorage.getItem('user')) {
    history.push('/home');
  }
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState('');
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  });
  const [signupInputs, setSignupInputs] = useState({
    name: '',
    email: '',
    password: '',
    secret: '',
  });

  const [signin, { loading }] = useMutation(LOGIN, {
    variables: { email: formInputs.email, password: formInputs.password },
  });
  console.log(formInputs);
  const [signup, { loading: signupLoading }] = useMutation(SIGNUP, {
    variables: {
      email: signupInputs.email,
      password: signupInputs.password,
      name: signupInputs.name,
      secret: signupInputs.secret,
    },
  });

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const inputSetter = e =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const signupSetter = e =>
    setSignupInputs({ ...signupInputs, [e.target.name]: e.target.value });
  const attemptLogin = async e => {
    e.preventDefault();
    try {
      const attempt = await signin();
      const {
        data: {
          signin: { email, name, id },
        },
      } = attempt;
      localStorage.setItem('user', JSON.stringify({ name, email, id }));
      history.push('/home');
    } catch (err) {
      if (err) setError(errors[getRandomInt(4)]);
    }
  };
  const attemptSignup = async e => {
    e.preventDefault();
    try {
      const attempt = await signup();

      const {
        data: {
          signup: { email, name },
        },
      } = attempt;
      // localStorage.setItem('user', JSON.stringify({ name, email }));
      // history.push('/home');
    } catch (err) {
      if (err) setError(errors[getRandomInt(4)]);
    }
  };
  return (
    <StyledLogin>
      <div className="loginCard">
        <span className="harambacksHeader">HARAMBACKS</span>
        {/* <img src={harambe} /> */}
        {!signUp ? (
          <>
            <form className="formDiv" onSubmit={e => attemptLogin(e)}>
              <TextField
                fullWidth
                className="inputField"
                label="Email"
                value={formInputs.email}
                name="email"
                onChange={e => inputSetter(e)}
              />
              <TextField
                fullWidth
                className="inputField"
                label="Password"
                value={formInputs.password}
                name="password"
                onChange={e => inputSetter(e)}
              />
              <div className="buttonDiv"></div>
              <button className="button" type="submit">
                LOGIN
              </button>
            </form>
            {error && <div className="errorDiv">{error}</div>}
            <div className="buttonDiv">
              <button
                className="smallerButton"
                onClick={() => setSignUp(!signUp)}
              >
                SIGN UP
              </button>
            </div>
          </>
        ) : (
          <>
            <form className="formDiv" onSubmit={e => attemptSignup(e)}>
              <TextField
                fullWidth
                className="inputField"
                label="Name"
                value={signupInputs.name}
                name="name"
                onChange={e => signupSetter(e)}
              />
              <TextField
                fullWidth
                className="inputField"
                label="Email"
                value={signupInputs.email}
                name="email"
                onChange={e => signupSetter(e)}
              />
              <TextField
                fullWidth
                className="inputField"
                label="Password"
                value={signupInputs.password}
                name="password"
                onChange={e => signupSetter(e)}
              />
              <TextField
                fullWidth
                className="inputField"
                label="Secret"
                value={signupInputs.secret}
                name="secret"
                onChange={e => signupSetter(e)}
              />
              {error && <div className="errorDiv">{error}</div>}
              <button className="button" type="submit">
                SIGNUP
              </button>
            </form>
            <button
              className="smallerButton"
              onClick={() => setSignUp(!signUp)}
            >
              CANCEL SIGN UP
            </button>
          </>
        )}
      </div>
    </StyledLogin>
  );
});

export default Login;
