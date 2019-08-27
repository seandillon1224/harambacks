import { gql } from 'apollo-boost';

const NOTE_TOGGLE = gql`
  mutation noteVote($voter: String!, $id: ID!, $note: String!) {
    noteVote(voter: $voter, id: $id, note: $note) {
      voter {
        name
      }
      note {
        id
      }
    }
  }
`;
export default NOTE_TOGGLE;
