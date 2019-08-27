import { gql } from 'apollo-boost';

const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $secret: String!
  ) {
    signup(email: $email, password: $password, name: $name, secret: $secret) {
      name
      email
    }
  }
`;

export default SIGNUP;
