import { gql } from 'apollo-boost';
const CREATE_NOTE = gql`
  mutation createNote($name: String!, $text: String!) {
    createNote(name: $name, text: $text) {
      creator {
        name
      }
      text
    }
  }
`;

export default CREATE_NOTE;
