import { gql } from 'apollo-boost';

const GET_BARBACKS = gql`
  query barbacks {
    barbacks {
      name
      note {
        text
      }
      id
    }
  }
`;

export default GET_BARBACKS;
