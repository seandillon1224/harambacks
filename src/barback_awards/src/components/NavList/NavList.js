import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
//styles
import { Nav } from './styles';
import { Context } from '../../router/AppRouter';

const NavList = ({ link, dropdown, children, ourClass }) => {
  const { setShow } = useContext(Context);
  const expand = () => {
    if (window.innerWidth <= '500') {
      setShow(false);
    }
  };
  return (
    <Nav
      onClick={expand}
      active={window.location.pathname === link && 'rgba(0, 0, 0, 0.12)'}
    >
      {link ? (
        <NavLink
          exact
          to={link}
          activeClassName={
            !dropdown ? 'dashboardTextActive' : 'dashboardTextReviewActive'
          }
          className={!dropdown ? 'dashboardText' : 'dashboardTextReview'}
        >
          {children}
        </NavLink>
      ) : (
        <div className={ourClass ? 'dashboardTextActive' : 'dashboardText'}>
          {children}
        </div>
      )}
    </Nav>
  );
};

export default NavList;
