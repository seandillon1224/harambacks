import { gql } from 'apollo-boost';

const GET_NOTE_VOTES_BY = gql`
  query noteVoteses($id: ID!) {
    noteVoteses(where: { voter: { id: $id } }) {
      id
      voter {
        id
      }
      note {
        id
      }
    }
  }
`;

export default GET_NOTE_VOTES_BY;
