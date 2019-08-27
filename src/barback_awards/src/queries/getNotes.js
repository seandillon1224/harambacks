import { gql } from 'apollo-boost';

const GET_NOTES = gql`
  query notes {
    notes {
      text
      creator {
        name
      }
      id
    }
  }
`;
export default GET_NOTES;
