import { gql } from 'apollo-boost';

const NOTE_TOGGLE = gql`
  mutation noteVote($voter: String!, $id: ID!) {
    noteVote(voter: $voter, id: $id) {
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
