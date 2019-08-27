import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      name
      email
    }
  }
`;

export default LOGIN;
