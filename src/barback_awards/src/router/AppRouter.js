import React, { useState, useContext } from 'react';
import {
  withRouter,
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Notes from '../containers/Notes';
import SideNav from '../components/SideNav/SideNav';
import Header from '../components/Header/Header';
import UploadNotes from '../containers/UploadNotes';
import DjaisKart from '../containers/DjaisKart';
import SecretSanta from '../containers/SecretSanta';
import './styles.css';
const Context = React.createContext({});
export { Context };

const PrivateRoute = withRouter(props => {
  const {
    show,
    // userValues: { userName },
  } = useContext(Context);
  //console.log(userName);
  const userName = 'hey';
  const { component: Component, history, ...rest } = props;
  return !userName ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <Route
      {...rest}
      render={props => {
        return (
          <>
            <Header header={history} />
            <SideNav />
            <div className={show ? 'RouterMainOpen' : 'RouterMainClosed'}>
              <Component {...props} />
            </div>
          </>
        );
      }}
    />
  );
});

const AppRouter = () => {
  const [show, setShow] = useState(false);
  return (
    <Context.Provider value={{ show, setShow }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <PrivateRoute path="/home" component={Home} exact={true} />
          <PrivateRoute path="/viewnotes" component={Notes} exact={true} />
          <PrivateRoute
            path="/uploadnotes"
            component={UploadNotes}
            exact={true}
          />
          <PrivateRoute path="/djaiskart" component={DjaisKart} exact={true} />
          <PrivateRoute
            path="/secretsanta"
            component={SecretSanta}
            exact={true}
          />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default AppRouter;
