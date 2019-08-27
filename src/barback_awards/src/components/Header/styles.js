import styled from 'styled-components';

const StyledHeader = styled.div`
  /* @keyframes bounce {
    from {
      transform: translateY(-100px);
    }
    20% {
      transform: translateY(0px);
    }
    30% {
      transform: translateY(-20px);
    }
    40% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(0px);
    }
    70% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-5px);
    }
    to {
      transform: translateY(0px);
    }
  }
  @-webkit-keyframes bounce {
    from {
      transform: translateY(-100px);
    }
    20% {
      transform: translateY(0px);
    }
    30% {
      transform: translateY(-20px);
    }
    40% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(0px);
    }
    70% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-5px);
    }
    to {
      transform: translateY(0px);
    }
  } */
  .navbar {
    min-height: 64px;
    background-color: #ffffff;
    position: fixed;
    display: flex;
    flex-direction: row;
    box-shadow: none;
  }
  .toolbarLeft {
    width: 250px;
    background-color: ${props => props.theme.darkestBlue};
    padding: 0;
    -webkit-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    -moz-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
  }
  .menuButton {
    color: #ffffff;
    transition: transform 0.5s;
    transform: rotate(${props => props.show});
  }
  .imgHeader {
    /* animation: bounce 2s;
    -webkit-animation: bounce 2s; */
    margin-left: 27px;
    width: 60%;
  }
  .toolbar {
    padding: 0;
    max-height: 64px;
    width: calc(100% - 250px);
    background-color: #ffffff;
    -webkit-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    -moz-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
  }
  .grow {
    flex-grow: 1;
    color: ${props => props.theme.darkestBlue};
    font-family: ${props => props.theme.font};
    font-size: 28px;
    margin-left: 30px;
  }

  p {
    color: black;
  }
`;
export { StyledHeader };
