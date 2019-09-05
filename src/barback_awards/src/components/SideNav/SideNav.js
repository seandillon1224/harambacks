import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
//styles
import StyledSidebar from './styles';
//adminlevel
import NavList from '../NavList/NavList';
import { Assignment, Lock, Call } from '@material-ui/icons';
import { Context } from '../../router/AppRouter';
const SideNav = () => {
  const { show } = useContext(Context);
  const stuff = JSON.parse(localStorage.getItem('user'));
  console.log(stuff);
  return (
    <>
      <StyledSidebar open={show}>
        <div className="sidenavItems">
          <div className="iconText">
            <div className="adminTextTop">Welcome, {stuff.name}</div>
          </div>
        </div>
        <ul>
          <NavList link="/home">
            <Assignment />
            Home
          </NavList>
          <NavList link="/uploadnotes">
            <Assignment />
            Upload Notes
          </NavList>
          <NavList link="/viewnotes">
            <Assignment />
            View/Vote
          </NavList>
          <NavList link="/secretsanta">
            <Assignment />
            View Secret Santa
          </NavList>
        </ul>
      </StyledSidebar>
    </>
  );
};

export default withRouter(SideNav);
