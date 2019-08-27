import { gql } from 'apollo-boost';

const CREATE_BARBACK = gql`
    mutation createBarback(name: String!, email: String!, password: String!){
      createBarback(name: $name, email: $email, password: $password){
      name
      email

    }
    }
  `;

export default CREATE_BARBACK;
