import { gql } from 'apollo-boost';

const GET_SPECIFIC_BARBACK = gql`
  query barback($name: String!) {
    barback(where: { name: $name }) {
      name
      note {
        text
      }
    }
  }
`;
export default GET_SPECIFIC_BARBACK;
