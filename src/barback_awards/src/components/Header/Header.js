import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
//constants
import harambe from '../../assets/harambe.png';
import { StyledHeader } from './styles';
import { Context } from '../../router/AppRouter';

const Header = props => {
  const {
    show,
    setShow,
    // userValues: { name },
  } = useContext(Context);
  return (
    <StyledHeader show={show ? '0deg' : '180deg'}>
      <AppBar className="navbar">
        <Toolbar className="toolbarLeft">
          <IconButton
            className="menuButton"
            aria-label="Menu"
            onClick={() => setShow(!show)}
          >
            <MenuIcon />
          </IconButton>
          {/* <img className="imgHeader" src={harambe} alt="our-guest-logo" /> */}
        </Toolbar>
        <Toolbar className="toolbar">
          <span className="grow">Harambacks</span>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
