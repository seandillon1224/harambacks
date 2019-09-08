import styled from 'styled-components';

export const FormCard = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.midnightBlue};
  font-family: ${props => props.theme.font};
  /* border: 8px solid #ffffff; */
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 0 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  #input {
    padding: 14px;
  }
  .checkboxes {
    display: flex;
    flex-direction: row;
  }
  .checkboxIndividual {
    flex: 1 0 20%;
  }
  .digits {
    font-size: 13px;
    font-style: italic;
    margin: 5px 0;
  }
  .searchDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px 0;
    margin: 15px 0;
    text-align: center;
  }
  .searchIcon {
    margin: 0 5px 0 10px;
  }
  .input {
    width: 200px;
    font-size: 18px;
    border: none;
    padding: 4px;
    &:focus {
      outline: none;
    }
  }
  h1 {
    padding: 10px;
    margin: 0px;
    display: flex;
    box-shadow: 0 2px 1px -1px gray;
    font-size: 24px;
    align-items: center;
  }
  .headerIcon {
    margin-right: 5px;
  }
  .backslash {
    margin: 0 8px 0 4px;
  }
  .cellIcons {
    &:hover {
      opacity: 0.7;
    }
  }
  .input {
    padding: 14px;
  }

  .alignForms {
    align-items: center;
    flex-direction: row;
  }
  form {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .short {
    width: 35px;
  }
  .medium {
    width: 70px;
  }
  .errorField {
    margin-top: 5px;
    text-align: center;
    color: ${props => props.theme.alertRed};
    font-size: 14px;
    font-family: ${props => props.theme.font};
  }
  .successField {
    margin-top: 5px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-family: ${props => props.theme.font};
  }
  .formInput {
    padding: 5px 0;
  }
  .buttonTwin {
    justify-content: center;
    display: flex;
    align-self: center;
  }

  .uploadImage {
    margin: 0 auto;
    justify-content: center;
    width: 50%;
  }
`;

export const StyledButton = styled.button`
  margin: ${props => props.margin || '30px 0 0 30px'};
  align-self: ${props => props.alignSelf};
  color: white;
  display: flex;
  width: ${props => props.width || '100px'};
  justify-content: space-evenly;
  align-items: center;
  background-color: #001d49;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  visibility: ${props => props.displayVal};
  &:hover {
    opacity: 0.7;
  }
`;
