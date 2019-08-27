import React from 'react';
import getBarbacks from '../queries/getBarbacks';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

const Home = withRouter(({ history }) => {
  const { loading, error, data } = useQuery(getBarbacks);
  if (!localStorage.getItem('user')) {
    history.push('/');
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(localStorage.getItem('user'));
  return <div>Hey</div>;
});

export default Home;
